"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";


export type DeleteResult = { ok: true, data: number } | { ok: false | false, code: string, message: string };
export const deleteArticles = async (ids: Array<number>): Promise<DeleteResult> => {
  if (!ids || ids.length === 0) {
    return { ok: false, code: "NOT_FOUND", message: "No item selected" };
  }

  const res = await prisma.article.deleteMany({
    where: { id: { in: [...ids] } }
  });

  revalidatePath("/admin");
  return { ok: true, data: res.count }
}