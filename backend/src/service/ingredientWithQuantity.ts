
import { prisma } from '../db';

export default {
  create: function (ingredientWithQuantity: { ingredientId: number, quantity: string }) {
    return prisma.ingredientsWithQuantity.create({
      data: {
        ingredient: {
          connect: {
            id: ingredientWithQuantity.ingredientId,
          },
        },
        quantity: ingredientWithQuantity.quantity,
      },
    });
  },

  createMany: function (ingredientsWithQuantity: { ingredientId: number, quantity: string }[]) {
    return prisma.$transaction(
      ingredientsWithQuantity.map(({ ingredientId, quantity }) => prisma.ingredientsWithQuantity.create({
        data: {
          ingredient: {
            connect: {
              id: ingredientId,
            },
          },
          quantity,
        },
      })),
    );
  },
};
