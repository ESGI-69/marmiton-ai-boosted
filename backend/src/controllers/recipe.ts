import { NextFunction, Request, Response } from 'express';
import recipeSerice from '../service/recipe';
import checkParams from '../utils/checkParams';
import checkQueryParams from '../utils/checkQueryParams';

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkParams(['id'], req.params);
      const id = parseInt(req.params.id);
      const recipe = await recipeSerice.getById(id);
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  },
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkQueryParams(['title', 'description'], req.query);
      const { title, description } = req.query as { title?: string; description?: string; };
      const recipes = await recipeSerice.search({ title: title || '', description: description || '' });
      res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  },

};
