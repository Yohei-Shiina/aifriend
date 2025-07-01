import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI();

export async function POST(request: NextRequest) {
  const { input } = await request.json();

  const response = await client.responses.create({
    model: "gpt-3.5-turbo",
    input: input || "Say Mango"
  });

  console.log(response)

  return NextResponse.json({ result: response.output_text });
}


