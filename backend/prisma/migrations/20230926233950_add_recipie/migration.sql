/*
  Warnings:

  - You are about to drop the column `content` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "content",
DROP COLUMN "published",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "ingredientsWithQuantityIds" INTEGER[],
ADD COLUMN     "steps" TEXT[];

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsWithQuantity" (
    "id" SERIAL NOT NULL,
    "quantity" TEXT NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngredientsWithQuantity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- AddForeignKey
ALTER TABLE "IngredientsWithQuantity" ADD CONSTRAINT "IngredientsWithQuantity_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsWithQuantity" ADD CONSTRAINT "IngredientsWithQuantity_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
