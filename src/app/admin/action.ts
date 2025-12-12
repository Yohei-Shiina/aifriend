"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { destroyImageFromCloudinary } from "@/lib/cloudinary";


export type DeleteResult = { ok: true, data: number } | { ok: false, code: string, message: string };
export const deleteArticles = async (ids: Array<number>): Promise<DeleteResult> => {
  if (!ids || ids.length === 0) {
    return { ok: false, code: "NOT_FOUND", message: "No item selected" };
  }
  try {

    // Delete associated images from Cloudinary
    const articlesWithImages = await prisma.article.findMany({
      where: { id: { in: [...ids] } },
      select: { image: true }
    });

    const deletedImagePublicIds: string[] = [];

    for (const article of articlesWithImages) {
      if (article.image?.public_id) {
        deletedImagePublicIds.push(article.image.public_id);
        await destroyImageFromCloudinary(article.image.public_id);
      }
    }

    // Delete articles
    const res = await prisma.article.deleteMany({
      where: { id: { in: [...ids] } }
    });

    // Delete related images as deleteMany does not cascade
    await prisma.image.deleteMany({
      where: { public_id: { in: deletedImagePublicIds } }
    })

    revalidatePath("/admin");
    return { ok: true, data: res.count }
  } catch (error) {
    console.error("Error deleting articles:", error);
    return { ok: false, code: "INTERNAL_ERROR", message: "An error occurred while deleting articles" };
  }
}