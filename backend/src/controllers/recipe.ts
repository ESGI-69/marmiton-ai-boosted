import { NextFunction, Request, Response } from 'express';
import recipeSerice from '../service/recipe';
import checkParams from '../utils/checkParams';
import checkQueryParams from '../utils/checkQueryParams';
import OpenAIQueryBuilder from '../utils/openAi';
import checkMandatoryFields from '../utils/checkMandatoryFields';

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkParams(['id'], req.params);
      const id = parseInt(req.params.id);
      const recipe = await recipeSerice.getById(id);
      let isFavorite = false;
      if (req.user && recipe) {
        isFavorite = recipe.favoriteByUsers.some((favorite) => favorite.userId === req.user?.id);
      }
      const favoriteCount = recipe?.favoriteByUsers.length || 0;
      const returnRecipe = { ...recipe, isFavorite, favoriteCount };
      delete returnRecipe.favoriteByUsers;
      res.status(200).json(returnRecipe);
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
      checkMandatoryFields(['prompt'], req.body);
      const prompt = req.body.prompt;
      const systemMessage = 'Tu es un chef étoilé au guide michelin et tu as une quinzaine d\'années d\'expérience dans le métier avec plusieurs concours culinaires gagnés à l\'internationnal, ton but est de donner des recettes. Formattez la recette de cuisine et répondez uniquement au format JSON. Ce JSON devrai contenir les champs title (string), description (string), ingredientsWithQuantities (array of object) with quantity (string), name (string) , steps (array). Répond moi en français et ne répéte jamais le nom des ingrédients dans la quantité';
      const model = 'gpt-3.5-turbo';
      const openAiResponse = await openAiQueryBuilder.generatePrompt(prompt, systemMessage, model);
      const openAiRecipie = JSON.parse(openAiResponse.choices[0].message.content as string);
      const exisitingRecipie = await recipeSerice.checkIfTitleExist(openAiRecipie.title);
      if (exisitingRecipie) {
        console.warn(`Recipie ${openAiRecipie.title} allready present in the database`);
        const recipe = await recipeSerice.getById(exisitingRecipie.id);
        return res.status(200).send(recipe);
      }
      const recipe = await recipeSerice.create(openAiRecipie);
      res.status(200).send(recipe);
    } catch (error) {
      next(error);
    }
  },

  favorite: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error('You must be logged in to favorite a recipe');
      checkParams(['id'], req.params);
      const id = parseInt(req.params.id);
      await recipeSerice.favorite(id, req.user.id);
      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  },

  unfavorite: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error('You must be logged in to unfavorite a recipe');
      checkParams(['id'], req.params);
      const id = parseInt(req.params.id);
      await recipeSerice.unfavorite(id, req.user.id);
      res.status(200).send({});
    } catch (error) {
      next(error);
    }
  },
};
