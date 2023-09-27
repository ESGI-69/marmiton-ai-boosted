import { prisma } from '../db';
import { Recipe } from '@prisma/client';

export default {
  add: function (recipe: Recipe, { notation, comment, authorId }: { notation: number, comment: string, authorId: number }) {
    prisma.rating.create({
      data: {
        notation,
        comment,
        recipe: {
          connect: {
            id: recipe.id,
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
};
