import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { jwtVerify } from 'jose';

import prisma from "@/lib/prisma";
import { scrape } from "@/lib/scrapeNews";
import { combineText, generateCitation, generatePrompt } from "@/lib/prompt";

const SCRAPE_DEFAULT_COUNT = 1;

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const client = new OpenAI();

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const body = await request.json();
  const { language } = body;

  if (!language) {
    return NextResponse.json({ error: 'Bad Request: No language specified' }, { status: 400 });
  }
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }
  const { payload } = await jwtVerify(token, secret);
  // 任意の role チェック（不要ならスキップ可）
  if (payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden: Not admin' }, { status: 403 });
  }

  const topic = await scrape(SCRAPE_DEFAULT_COUNT);
  let prompt;
  if (topic instanceof Array && topic.length > 0) {
    prompt = generatePrompt(language, topic[1].title);
  } else {
    prompt = generatePrompt(language);
  }

  const response = await client.responses.create({
    model: process.env.CHAT_MODEL || "gpt-4o-mini",
    tool_choice: { type: "web_search_preview" },
    tools: [{ type: "web_search_preview", search_context_size: "low" }],
    input: prompt,

  });

  const output = response.output;
  const message = output.find(item => item.type === 'message');
  const annotations = message?.content
    .find(item => item.type === 'output_text')?.annotations
    .filter((item) => item.type === "url_citation") || [];

  const uniqueAnnotations = Array.from(
    new Map(
      annotations.map(item => [
        [item.url, item.title].join('|'),
        item
      ])
    ).values()
  );

  if (uniqueAnnotations?.length === 0) {
    return NextResponse.json({ error: "No citations found. End post generation" }, { status: 500 });
  }
  const formattedCitations = generateCitation(uniqueAnnotations);

  const raw = response.output_text;
  if (!raw) {
    return NextResponse.json({ error: "No content from OpenAI" }, { status: 500 });
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON format from AI" }, { status: 500 });
  }

  const { title, description, content } = parsed;

  await prisma.article.create({
    data: {
      title,
      description,
      content: combineText([content, formattedCitations]),
      is_published: true,
      published_at: new Date(),
    }
  });

  return NextResponse.json({ result: raw });
}


