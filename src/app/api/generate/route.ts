import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { scrape } from "@/lib/scrapeNews";
import { combineText, generateHeadingCitation } from "@/lib/prompt";
import { generateImageByTitle } from "@/lib/generateImage";
import { destroyImageFromCloudinary, uploadBufferToCloudinary } from "@/lib/cloudinary";

import { promptEN } from "@root/config/prompt";
import ARTICLES_CONFIG from "@root/config/articles.json";

export const maxDuration = 60;

const SCRAPE_DEFAULT_COUNT = 1;

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
const client = new OpenAI();

export async function POST(request: NextRequest) {
  try {
    // Authentication
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
    }

    try {// Verify token
      const { payload } = await jwtVerify(token, jwtSecret);
      if (payload.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden: Not admin' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { language } = body;

    if (!language) {
      return NextResponse.json({ error: 'Bad Request: No language specified' }, { status: 400 });
    }

    // TODO: Collecting topics process should be expanded
    const topics = await scrape(SCRAPE_DEFAULT_COUNT);
    if (!Array.isArray(topics)) {
      return NextResponse.json({ error: topics.error }, { status: topics.status })
    }

    // Time
    const now = new Date();
    now.setDate(now.getDate() - 3);
    const threeDaysAgoISO = now.toISOString();
    const prompt = promptEN(topics[0].title, threeDaysAgoISO);

    console.info("Generating Response");
    const response = await client.responses.parse({
      model: process.env.CHAT_MODEL || "gpt-4o-mini",
      tool_choice: "required",
      tools: [{ type: "web_search_preview", search_context_size: "medium" }],
      input: prompt,
      text: {
        format: zodTextFormat(z.object({
          title: z.string(),
          description: z.string(),
          content: z.string(),
          citations: z.array(
            z.object({
              urlTitle: z.string(),
              url: z.string(),
            })
          ),
        }), "search"),
      },
    });

    const raw = response.output_text;
    console.info(raw);
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Invalid JSON format from AI", raw }, { status: 500 });
    }

    const { title, description, content, citations } = parsed;
    citations.forEach((item: { urlTitle: string, url: string }) => {
      console.info(`- [${item.url}]`);
    })

    // generate image
    console.info("Generating Image");
    const startGenerateImage = performance.now();
    let imageBuffer;
    try {
      imageBuffer = await generateImageByTitle(title);
    } catch (imageError) {
      console.error("Image generation failed:", imageError);
      return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
    }
    const elapsedGenerateImage = performance.now() - startGenerateImage;
    console.info(`Generating Image time: ${elapsedGenerateImage}`);

    console.info("Uploading image to cloudinary")
    const publicId = `blog_images/prod/${Date.now().toString()}`; // Unique public ID for the image
    let cloudResult;
    try {
      cloudResult = await uploadBufferToCloudinary(imageBuffer, publicId);
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError);
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }

    const formattedCitation: string = generateHeadingCitation(citations);

    try {
      await prisma.article.create({
        data: {
          title,
          description,
          content: combineText([content, formattedCitation, ARTICLES_CONFIG.MarkdownArticleEnding]),
          is_published: true,
          published_at: new Date(),
          image_url: cloudResult.secure_url,
          image: {
            create: {
              public_id: cloudResult.public_id,
              secure_url: cloudResult.secure_url,
            },
          },
        },
      });
      return NextResponse.json({ result: raw });
    } catch (dbErr) {
      console.warn(`Destroying Image from Cloudinary: ID- ${cloudResult.public_id}`)
      try {
        await destroyImageFromCloudinary(cloudResult.public_id);
      } catch (destroyError) {
        console.error("Failed to destroy image from Cloudinary:", destroyError);
      }
      throw dbErr;
    }
  } catch (error) {
    console.error("Unexpected error in generate API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
