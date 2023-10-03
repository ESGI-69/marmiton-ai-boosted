import OpenAI, { ClientOptions } from 'openai';

class OpenAIQueryBuilder {
  private static instance: OpenAIQueryBuilder;
  private client: OpenAI;

  private constructor() {
    const apiKey = process.env.OPENAI_API_KEY || '';
    //const dangerouslyAllowBrowser = process.env.OPENAI_DANGEROUSLY_ALLOW_BROWSER === 'true';
    const clientOptions: ClientOptions = { apiKey };
    this.client = new OpenAI(clientOptions);
  }

  public static getInstance(): OpenAIQueryBuilder {
    if (!OpenAIQueryBuilder.instance) {
      OpenAIQueryBuilder.instance = new OpenAIQueryBuilder();
    }
    return OpenAIQueryBuilder.instance;
  }

  public async generatePrompt(prompt: string, systemMessage: string, model: string): Promise<OpenAI.Chat.Completions.ChatCompletion.Choice[]> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =  [
      {
        role: 'system',
        content: systemMessage,
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await this.client.chat.completions.create({
      messages,
      model,
    });

    return response.choices;
  }
}

export default OpenAIQueryBuilder;
