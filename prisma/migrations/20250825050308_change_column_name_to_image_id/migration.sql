/*
  Warnings:

  - You are about to drop the column `imageId` on the `Article` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_imageId_fkey";

-- DropIndex
DROP INDEX "Article_imageId_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "imageId",
ADD COLUMN     "image_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Article_image_id_key" ON "Article"("image_id");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
