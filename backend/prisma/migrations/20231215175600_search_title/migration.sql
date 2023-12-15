/*
  Warnings:

  - A unique constraint covering the columns `[searchTitle]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `searchTitle` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "searchTitle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_searchTitle_key" ON "Recipe"("searchTitle");
