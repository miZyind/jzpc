import { CohereClient } from 'cohere-ai';

import { Inject, Injectable } from '@nestjs/common';

import { AIConfig, AI_CONFIG } from '#configs';

@Injectable()
export class CohereService {
  private readonly client;

  private readonly model;

  constructor(
    @Inject(AI_CONFIG)
    { cohere: { token, model } }: AIConfig,
  ) {
    this.client = new CohereClient({ token });
    this.model = model;
  }

  async ask(value: string): Promise<string> {
    const { generations } = await this.client.generate({
      model: this.model,
      prompt: value,
      maxTokens: 10,
    });
    const [result] = generations;

    return result.text;
  }
}
