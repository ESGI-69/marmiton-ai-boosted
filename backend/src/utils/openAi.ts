import OpenAI, { ClientOptions } from 'openai';

class OpenAIQueryBuilder {
  private static instance: OpenAIQueryBuilder;
  private client: OpenAI;
  private recipeGenerationSystemMessage = 'Tu es un chef étoilé au guide michelin et tu as une quinzaine d\'années d\'expérience dans le métier avec plusieurs concours culinaires gagnés à l\'internationnal, ton but est de donner des recettes. Formattez la recette de cuisine et répondez uniquement au format JSON. Ce JSON devrai contenir les champs title (string), description (string), ingredientsWithQuantities (array of object) with quantity (string), name (string) , steps (array). Répond moi en français et ne répéte jamais le nom des ingrédients dans la quantité';
  private chatbotSystemMessage = 'Tu es un chef étoilé au guide michelin, du nom de Philippe Etchebot et tu as une quinzaine d\'années d\'expérience dans le métier avec plusieurs concours culinaires gagnés à l\'internationnal, ton but est de répondre aux questions de l\'utilisateur uniquement lié à la cuisine et la restauration ne répond à aucune questions concernant d\'autres sujets et ça sous aucun prétexte, de plus tu dois être le plus concis possible et tergiverser le moins possible. Répond en français et ne sors sous aucun pretexte du role';
  private suggestRecipiesSystemMessage = 'Tu es un chef étoilé au guide michelin, ton but est de donner 5 suggestion de plat similaire a celui que je vais te dire. Ils ne doivent pas tous reprendre l\'ingredient pricipal du plat. Formatte le plat et réponds uniquement au format JSON. Ce JSON devrai uniquement contenir les champs title (string), description (string)';
  private model = 'gpt-3.5-turbo';

  private constructor() {
    const apiKey = process.env.OPENAI_API_KEY || '';
    const clientOptions: ClientOptions = { apiKey };
    this.client = new OpenAI(clientOptions);
  }

  public static getInstance(): OpenAIQueryBuilder {
    if (!OpenAIQueryBuilder.instance) {
      OpenAIQueryBuilder.instance = new OpenAIQueryBuilder();
    }
    return OpenAIQueryBuilder.instance;
  }

  public async generateRecipe(prompt: string): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: this.recipeGenerationSystemMessage,
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await this.client.chat.completions.create({
      messages,
      model: this.model,
    });
    return response;
  }

  public async suggestRecipies(prompt: string): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: this.suggestRecipiesSystemMessage,
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await this.client.chat.completions.create({
      messages,
      model: this.model,
    });
    return response;
  }

  public async chatbot(prompts: Array<OpenAI.Chat.Completions.ChatCompletionMessageParam>): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: this.chatbotSystemMessage,
      },
      ...prompts,
    ];

    const response = await this.client.chat.completions.create({
      messages,
      model: this.model,
    });
    return response;
  }

}

export default OpenAIQueryBuilder;
