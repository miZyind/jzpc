import { CohereClient } from 'cohere-ai';

import { Inject, Injectable, Logger } from '@nestjs/common';

import { AIConfig, AI_CONFIG } from '#configs';

@Injectable()
export class CohereService {
  private readonly logger = new Logger(CohereService.name);

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
    this.logger.log(`Q [${value}]`);

    const generation = await this.client.generate({
      model: this.model,
      prompt: value,
      maxTokens: 10,
    });
    const {
      generations: [{ text: answer }],
    } = generation;

    this.logger.log(`A [${answer}]`);

    return answer;
  }
}
