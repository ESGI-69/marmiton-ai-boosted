import OpenAI, { ClientOptions } from 'openai';

class OpenAIQueryBuilder {
  private static instance: OpenAIQueryBuilder;
  private client: OpenAI;
  private previousResponse: string | null;
  private messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];

  private constructor() {
    const apiKey = process.env.OPENAI_API_KEY || '';
    // const dangerouslyAllowBrowser = process.env.OPENAI_DANGEROUSLY_ALLOW_BROWSER === 'true';
    const clientOptions: ClientOptions = { apiKey };
    this.client = new OpenAI(clientOptions);
    this.previousResponse = null;
    this.messages = [];
  }

  public static getInstance(): OpenAIQueryBuilder {
    if (!OpenAIQueryBuilder.instance) {
      OpenAIQueryBuilder.instance = new OpenAIQueryBuilder();
    }
    return OpenAIQueryBuilder.instance;
  }

  public async generatePrompt(prompt: string, systemMessage: string, model: string): Promise<OpenAI.Chat.Completions.ChatCompletion.Choice[]> {
    if (!this.messages.some((message) => message.content === systemMessage)) {
      this.messages.push({
        role: 'system',
        content: systemMessage,
      });
    }

    if (this.previousResponse) {
      this.messages.push({
        role: 'assistant',
        content: this.previousResponse,
      });
    }

    this.messages.push({
      role: 'user',
      content: prompt,
    });

    const response = await this.client.chat.completions.create({
      messages: this.messages,
      model,
    });

    const message = response.choices[0]?.message;
    if (message && message.content) {
      this.previousResponse = message.content;
    }

    return response.choices;
  }
}

export default OpenAIQueryBuilder;
