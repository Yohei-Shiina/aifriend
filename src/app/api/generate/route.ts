import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { jwtVerify } from 'jose';
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const client = new OpenAI();

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
  }
  const { payload } = await jwtVerify(token, secret);
  // 任意の role チェック（不要ならスキップ可）
  if (payload.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden: Not admin' }, { status: 403 });
  }

  const { input } = await request.json();

  const response = await client.responses.create({
    model: "gpt-3.5-turbo",
    input: input || "Say Mango"
  });

  console.log(response)

  return NextResponse.json({ result: response.output_text });
}


