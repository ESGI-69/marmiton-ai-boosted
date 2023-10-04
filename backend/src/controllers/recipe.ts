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
      const prompt = req.body.prompt;
      const systemMessage = 'Tu es un chef étoilé au guide michelin et tu as une quinzaine d\'années d\'expérience dans le métier avec plusieurs concours culinaires gagnés à l\'internationnal, ton but est de donner des recettes. Formattez la recette de cuisine et répondez uniquement au format JSON. Ce JSON devrai contenir les champs title (string), description (string), ingredientsWithQuantity (array of object) with quantity (string), ingredient (string) , steps (array) ';
      const model = 'gpt-3.5-turbo';
      const openAiResponse = await openAiQueryBuilder.generatePrompt(prompt, systemMessage, model);
      let response;
      if (openAiResponse.choices[0].message.content) {
        response = JSON.parse(openAiResponse.choices[0].message.content);
      }
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  },
};
