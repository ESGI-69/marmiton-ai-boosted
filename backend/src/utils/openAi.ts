import OpenAI, { ClientOptions } from 'openai';
import { Filters } from '../controllers/recipe';

class OpenAIQueryBuilder {
  private static instance: OpenAIQueryBuilder;
  private client: OpenAI;
  private recipeGenerationSystemMessage = 'Ton but est de donner des recettes. Formattez la recette de cuisine et répondez uniquement au format JSON. Ce JSON devrai contenir les champs title (string), description (string), ingredientsWithQuantities (array of object) with quantity (string), name (string) , steps (array). Répond moi en français et ne répéte jamais le nom des ingrédients dans la quantité';
  private sidesGenerationSystemMessage = 'Ton but est de donner des recommendations d\'accompagnement pour une recette l\'utilisateur va te donner le type d\'accompagement qu\'il veut la recette qu\'il veut accompangé, tu ne dois pas donné autre chose que ce que veux l\'utilisateur (vin, fromage ou dessert), tu donneras cinq accompagnements possibles, uniques et pertinents tu donneras uniquement le nom tu ne fais pas de phrase. Le type d\'accompagment demandé te sera donné. Tu es obligé de formattez la réponse au format JSON. Ce JSON devrai contenir le champs sides (tableau) qui contiendra les 5 accompagnements (court texte). Répond moi en français et donnne moi 5 accompagnements possibles, uniques et pertinents dans le tableau sides, tu donneras que le nom de l\'accompagement tu ne feras pas de phrase.';
  private chatbotSystemMessage = 'Tu es un chef étoilé au guide michelin, du nom de Philippe Etchebot et tu as une quinzaine d\'années d\'expérience dans le métier avec plusieurs concours culinaires gagnés à l\'internationnal, ton but est de répondre aux questions de l\'utilisateur uniquement lié à la cuisine et la restauration ne répond à aucune questions concernant d\'autres sujets et ça sous aucun prétexte, de plus tu dois être le plus concis possible et tergiverser le moins possible. Répond en français et ne sors sous aucun pretexte du role';
  private suggestRecipiesSystemMessage = 'Ton but est de donner 5 suggestion de plat similaire a celui que je vais te dire. Ils ne doivent pas tous reprendre l\'ingredient pricipal du plat. Répond impérativement en français. Formatte le plat et réponds uniquement au format JSON. Ce JSON devrai uniquement contenir un tableau d\'object avec les champs title (string), description (string)';
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

  public async generateRecipe(
    prompt: string,
    allergies: string[] = [],
    nonLikedIngredients: string[] = [],
    filters: Filters = { vegan: false, lactoseFree: false, calories: null },
  ): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    let enrichedSystemMessage = this.recipeGenerationSystemMessage;
    if ([...allergies, ...nonLikedIngredients].length > 0) {
      enrichedSystemMessage += ` Prend en compte les aliment interdit suivant et propose moi une recette que les personnes avec ces aliment interdit peuvent manger : ${[...allergies, ...nonLikedIngredients].join(', ')}. Si, et seulement si, ces aliments interdit sont normalement utilisés dans la recette, tu dois obligatoirement les précier dans le titre et la description de la recette.`;
    }
    if (filters?.vegan) {
      enrichedSystemMessage += ' La recette doit être vegan, tu dois obligatoirement les précier dans le titre et la description de la recette.';
    }
    if (filters?.lactoseFree) {
      enrichedSystemMessage += ' La recette doit être sans lactose, tu dois obligatoirement les précier dans le titre et la description de la recette.';
    }
    if (filters?.calories) {
      enrichedSystemMessage += ` La recette doit contenir ${filters.calories} calories, tu dois obligatoirement les précier dans le titre et la description de la recette.`;
    }
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: enrichedSystemMessage,
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

  public async generateSides(recipe: string, side: string): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: this.sidesGenerationSystemMessage,
      },
      {
        role: 'user',
        content: `Je veux 5 ${side} pour accompagner cette recette : ${recipe}`,
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
