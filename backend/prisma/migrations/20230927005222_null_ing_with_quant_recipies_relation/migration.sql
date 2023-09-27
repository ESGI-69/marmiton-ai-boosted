-- DropForeignKey
ALTER TABLE "IngredientsWithQuantity" DROP CONSTRAINT "IngredientsWithQuantity_recipeId_fkey";

-- AlterTable
ALTER TABLE "IngredientsWithQuantity" ALTER COLUMN "recipeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "IngredientsWithQuantity" ADD CONSTRAINT "IngredientsWithQuantity_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
