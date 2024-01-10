import { prisma } from '../db';
import prismaSearchQueryBuilder from '../utils/prismaSearchQueryBuilder';
import { unaccent } from '../utils/formater';

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
  create: async function (recipeInput: CreateRecipeInput, imageUrl: string = '') {
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
        searchTitle: unaccent(recipeInput.title),
        title: recipeInput.title,
        description: recipeInput.description,
        ingredientsWithQuantity: {
          connect: ingredientsWithQuantity.map(({ id }) => ({ id })),
        },
        steps: recipeInput.steps,
        imageUrl,
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

  getById: async function (id: number, userId?: number) {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
      include: {
        favoriteByUsers: {
          select: {
            userId: true,
          },
        },
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

    let averageRating = 0;
    if (recipe) {
      averageRating = recipe.ratings.reduce((acc, rating) => acc + rating.notation, 0) / recipe.ratings.length || 0;
      averageRating = Math.round(averageRating * 10) / 10;
    }

    let isFavorite = false;
    if (userId && recipe) {
      isFavorite = recipe.favoriteByUsers.some((favorite) => favorite.userId === userId);
    }
    const favoriteCount = recipe?.favoriteByUsers.length || 0;
    const returnRecipe = { ...recipe, isFavorite, favoriteCount, averageRating };
    delete returnRecipe.favoriteByUsers;
    return returnRecipe;
  },

  getMostFav: async function (limit: number = 10) {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        favoriteByUsers: {
          _count: 'desc',
        },
      },
      take: limit,
    });
    return recipes;
  },

  checkExist: async function (id: number) {
    return (await prisma.recipe.count({
      where: {
        id,
      },
    })) === 1;
  },

  checkIfTitleExist: async function (title: string) {
    return (await prisma.recipe.findFirst({ where: { title: { equals: title, mode: 'insensitive' } } })) || false;
  },

  search: async function (query: { title?: string; description?: string }) {
    const searchQuery = { searchTitle: unaccent(query.title || ''), description: query.description || '' };
    const prismaQuery = prismaSearchQueryBuilder(searchQuery);
    const recipes = await prisma.recipe.findMany(prismaQuery);
    return recipes;
  },

  favorite: async function (id: number, userId: number) {
    await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        favoriteByUsers: {
          create: {
            userId,
          },
        },
      },
    });
    return this.getById(id, userId);
  },

  unfavorite: async function (id: number, userId: number) {
    await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        favoriteByUsers: {
          deleteMany: {
            userId,
          },
        },
      },
    });
    return this.getById(id, userId);
  },

  getTitleById: async function (id: number): Promise<string> {
    const recipe = await prisma.recipe.findUnique({ where: { id }, select: { title: true } });
    if (!recipe || recipe.title === undefined) {
      throw new Error(`Recipe with id ${id} not found`);
    }
    return recipe.title;
  },
};
