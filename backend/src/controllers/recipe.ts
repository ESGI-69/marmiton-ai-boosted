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
      checkMandatoryFields(['prompt'], req.body);
      const prompt = req.body.prompt;
      const openAiResponse = await openAiQueryBuilder.generateRecipe(prompt);
      const openAiRecipie = JSON.parse(openAiResponse.choices[0].message.content as string);
      const exisitingRecipie = await recipeSerice.checkIfTitleExist(openAiRecipie.title);
      if (exisitingRecipie) {
        console.warn(`Recipie ${openAiRecipie.title} allready present in the database`);
        const recipe = await recipeSerice.getById(exisitingRecipie.id);
        return res.status(200).send(recipe);
      }
      const generatedRecipe = await recipeSerice.create(openAiRecipie);
      const recipe = await recipeSerice.getById(generatedRecipe.id);
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

  suggestRecipies: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkParams(['id'], req.params);
      const id = parseInt(req.params.id);
      const recipe = await recipeSerice.getById(id);
      if (!recipe.title) throw new Error('Recipe not found');
      const openAiQueryBuilder = OpenAIQueryBuilder.getInstance();
      const openAiResponse = await openAiQueryBuilder.suggestRecipies(recipe.title);
      const openAiRecipies = openAiResponse.choices.map((choice) => JSON.parse(choice.message.content as string));
      res.status(200).send(openAiRecipies[0].suggestions || openAiRecipies[0]);
    } catch (error) {
      next(error);
    }
  },

  getWine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkParams(['id'], req.params);
      const id = parseInt(req.params.id);
      const recipe = await recipeSerice.getTitleById(id);

      const openAiQueryBuilder = OpenAIQueryBuilder.getInstance();
      const openAiResponse = await openAiQueryBuilder.generateSides(recipe, 'vin');
      const winesRecommendation = JSON.parse(openAiResponse.choices[0].message.content as string);

      res.status(200).send(winesRecommendation);
    } catch (error) {
      next(error);
    }
  },

  getCheese: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkParams(['id'], req.params);
      const id = parseInt(req.params.id);
      const recipe = await recipeSerice.getTitleById(id);

      const openAiQueryBuilder = OpenAIQueryBuilder.getInstance();
      const openAiResponse = await openAiQueryBuilder.generateSides(recipe, 'fromage');
      const cheeseRecommendation = JSON.parse(openAiResponse.choices[0].message.content as string);

      res.status(200).send(cheeseRecommendation);
    } catch (error) {
      next(error);
    }
  },

  getDessert: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkParams(['id'], req.params);
      const id = parseInt(req.params.id);
      const recipe = await recipeSerice.getTitleById(id);

      const openAiQueryBuilder = OpenAIQueryBuilder.getInstance();
      const openAiResponse = await openAiQueryBuilder.generateSides(recipe, 'dessert');
      const dessertRecommendation = JSON.parse(openAiResponse.choices[0].message.content as string);

      res.status(200).send(dessertRecommendation);
    } catch (error) {
      next(error);
    }
  },
};
