import { prisma } from '../db';

export default {
  add: function (recipeId: number, { notation, comment, authorId }: { notation: number, comment: string, authorId: number }) {
    return prisma.rating.create({
      data: {
        notation,
        comment,
        recipe: {
          connect: {
            id: recipeId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  },

  getRatingById: function (id: number) {
    return prisma.rating.findUnique({
      where: {
        id,
      },
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
    });
  },
};
