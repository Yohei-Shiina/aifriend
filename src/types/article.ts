import { Prisma } from "@root/generated/prisma/client";


export const articleWithImageArgs =
  Prisma.validator<Prisma.ArticleDefaultArgs>()({
    include: { image: true },
  })

export type ArticleWithImage =
  Prisma.ArticleGetPayload<typeof articleWithImageArgs>