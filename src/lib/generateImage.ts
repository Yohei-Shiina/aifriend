import OpenAI from "openai";
import { combineText } from "./prompt";


const IMAGE_SIZE = "1792x1024"; // Default image size 16/9 aspect ratio

const client = new OpenAI();

export async function generateImageByTitle(title: string) {
  try {
    const img = await client.images.generate({
      model: "dall-e-3",
      prompt: combineText([title, "generate image in cartoon style"]),
      n: 1,
      size: IMAGE_SIZE,
      quality: "standard",
      response_format: "b64_json",
    });

    if (!img.data || img.data.length === 0 || !img.data[0].b64_json) {
      throw new Error("Image generation failed: No image data returned");
    }

    const imageBuffer = Buffer.from(img.data[0].b64_json, "base64");
    return imageBuffer;
  } catch (error) {
    console.error("Image generation error:", error);
    throw new Error(`Image generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

