import { prisma } from '../db';

interface CreateRecipeInput {
  title: string;
  description: string;
  steps: string[];
  ingredientsWithQuantities: {
    name: string;
    quantity: string;
  }[];
}

export default {
  create: async function (recipeInput: CreateRecipeInput) {
    const ingredients = await prisma.$transaction(
      recipeInput.ingredientsWithQuantities.map(({ name }) => prisma.ingredient.upsert({
        where: {
          name,
        },
        create: {
          name,
        },
        update: {},
      })),
    );
    const ingredientIdsWithQuantities = recipeInput.ingredientsWithQuantities.map(({ name, quantity }) => {
      const ingredient = ingredients.find((ingredient) => ingredient.name === name);
      if (!ingredient) throw new Error('FAIL TO CREATE INGREDIENT WITH QUANTITY');
      return {
        ingredientId: ingredient.id,
        quantity,
      };
    });
    const ingredientsWithQuantity = await prisma.$transaction(
      ingredientIdsWithQuantities.map(({ ingredientId, quantity }) => prisma.ingredientsWithQuantity.create({ data: {
        ingredient: {
          connect: {
            id: ingredientId,
          },
        },
        quantity,
      } })),
    );

    const recipe = await prisma.recipe.create({
      data: {
        title: recipeInput.title,
        description: recipeInput.description,
        ingredientsWithQuantity: {
          connect: ingredientsWithQuantity.map(({ id }) => ({ id })),
        },
        steps: recipeInput.steps,
      },
      include: {
        ingredientsWithQuantity: {
          include: {
            ingredient: true,
          },
        },
        ratings: true,
      },
    });
    return recipe;
  },
};
