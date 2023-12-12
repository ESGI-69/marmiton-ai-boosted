import { NextFunction, Request, Response } from 'express';
import OpenAIQueryBuilder from '../utils/openAi';

export default {
  sendPrompt: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const openAiQueryBuilder = OpenAIQueryBuilder.getInstance();
      const prompt = req.body.prompts;
      const systemMessage = 'Tu es un chef étoilé au guide michelin, du nom de Philippe Etchebot et tu as une quinzaine d\'années d\'expérience dans le métier avec plusieurs concours culinaires gagnés à l\'internationnal, ton but est de répondre aux questions de l\'utilisateur uniquement lié à la cuisine et la restauration ne répond à aucune questions concernant d\'autres sujets et ça sous aucun prétexte, de plus tu dois être le plus concis possible et tergiverser le moins possible. Répond en français et ne sors sous aucun pretexte du role';
      const model = 'gpt-3.5-turbo';
      const openAiResponse = await openAiQueryBuilder.generatePromptChatbot(prompt, systemMessage, model);
      const openAiRecipie = openAiResponse.choices[0].message;
      res.status(200).send(openAiRecipie);
    } catch (error) {
      next(error);
    }
  },
};
