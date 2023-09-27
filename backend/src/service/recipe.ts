import { prisma } from '../db';

import ingredientService from './ingredient';
import ingredientWithQuantityService from './ingredientWithQuantity';

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
    const ingredients = await ingredientService.createManyIfNotExist(recipeInput.ingredientsWithQuantities);

    const ingredientIdsWithQuantities = recipeInput.ingredientsWithQuantities.map(({ name, quantity }) => {
      const ingredient = ingredients.find((ingredient) => ingredient.name === name);
      if (!ingredient) throw new Error('FAIL TO CREATE INGREDIENT WITH QUANTITY');
      return {
        ingredientId: ingredient.id,
        quantity,
      };
    });
    const ingredientsWithQuantity = await ingredientWithQuantityService.createMany(ingredientIdsWithQuantities);

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
