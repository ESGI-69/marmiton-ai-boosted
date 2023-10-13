import { prisma } from '../db';
import prismaSearchQueryBuilder from '../utils/prismaSearchQueryBuilder';

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
    const rawIngredients = await ingredientService.createManyIfNotExist(recipeInput.ingredientsWithQuantities);

    const ingredients = rawIngredients.filter(({ name }) => name.toLocaleLowerCase() !== 'sel' && name.toLocaleLowerCase() !== 'poivre');

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

  getById: function (id: number) {
    return prisma.recipe.findUnique({
      where: {
        id,
      },
      include: {
        ingredientsWithQuantity: {
          include: {
            ingredient: true,
          },
        },
        ratings: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  },

  checkExist: async function (id: number) {
    return (await prisma.recipe.count({
      where: {
        id,
      },
    })) === 1;
  },

  search: async function (query: { title?: string; description?: string }) {
    const prismaQuery = prismaSearchQueryBuilder(query);
    const recipes = await prisma.recipe.findMany(prismaQuery);
    return recipes;
  },
};
