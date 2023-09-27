import { NextFunction, Request, Response } from 'express';
import recipeSerice from '../service/recipe';
import ratingService from '../service/rating';
import checkParams from '../utils/checkParams';
import checkMandatoryFields from '../utils/checkMandatoryFields';

export default {
  addRating: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error('You must be logged in to add a rating');
      checkParams(['id'], req.params);
      const recipeId = parseInt(req.params.id);
      const isRecipeExist = await recipeSerice.checkExist(recipeId);
      if (!isRecipeExist) throw new Error('Recipe not found');

      checkMandatoryFields(['notation'], req.body);

      const notation = parseInt(req.body.notation);

      if (notation < 0 || notation > 5) {
        throw new Error('Notation must be between 0 and 5');
      }

      const createdRating = await ratingService.add(recipeId, { notation, comment: req.body.comment, authorId: req.user.id });
      const rating = await ratingService.getRatingById(createdRating.id);

      res.status(201).json(rating);
    } catch (error) {
      next(error);
    }
  },
};
