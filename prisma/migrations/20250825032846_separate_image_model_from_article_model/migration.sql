-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "article_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_article_id_key" ON "Image"("article_id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
