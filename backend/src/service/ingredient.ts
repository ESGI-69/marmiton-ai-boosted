import { prisma } from '../db';

interface createIngredientInput {
  name: string;
}

export default {
  create: function (ingredientInput: createIngredientInput) {
    return prisma.ingredient.create({
      data: {
        name: ingredientInput.name,
      },
    });
  },

  createManyIfNotExist: function (ingredientInputs: createIngredientInput[]) {
    return prisma.$transaction(
      ingredientInputs.map(({ name }) => prisma.ingredient.upsert({
        where: {
          name,
        },
        create: {
          name,
        },
        update: {},
      })),
    );
  },
};
