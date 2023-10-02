import { NextFunction, Request, Response } from 'express';
import recipeSerice from '../service/recipe';
import checkParams from '../utils/checkParams';
import checkQueryParams from '../utils/checkQueryParams';
import OpenAIQueryBuilder from '../utils/openAi';

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
      const recipes = await recipeSerice.search(req.query);
      res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  },

  searchAi: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const openAiQueryBuilder = OpenAIQueryBuilder.getInstance();
      // console.log(req.body.prompt);
      const prompt = req.body.prompt;
      const systemMessage = 'Tu es un chatbot et tu es un chef étoilé au guide michelin et tu as une quinzaine d\'années d\'expérience dans le métier avec plusieurs concours culinaires gagnés à l\'internationnal, ton but est de donnée des recettes.';
      const model = 'gpt-3.5-turbo';
      const openAiResponse = await openAiQueryBuilder.generatePrompt(prompt, systemMessage, model);
      // console.log(openAiResponse);
      res.status(200).send(openAiResponse);
    } catch (error) {
      next(error);
    }
  },
};
