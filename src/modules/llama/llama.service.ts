import { Inject, Injectable } from '@nestjs/common';

import { AIConfig, AI_CONFIG } from '#configs';

import type { LlamaChatSession, LlamaContext } from 'node-llama-cpp';

@Injectable()
export class LLAMAService {
  private readonly model;

  private session: typeof LlamaChatSession | null = null;

  private context: LlamaContext | null = null;

  constructor(
    @Inject(AI_CONFIG)
    { llama: { model } }: AIConfig,
  ) {
    this.model = model;
  }

  async onModuleInit(): Promise<void> {
    // eslint-disable-next-line no-eval -- https://github.com/microsoft/TypeScript/issues/43329
    const { LlamaContext, LlamaModel, LlamaChatSession } = (await eval(
      `import('node-llama-cpp')`,
    )) as typeof import('node-llama-cpp');

    this.context = new LlamaContext({
      model: new LlamaModel({ modelPath: `models/${this.model}.gguf` }),
    });
    this.session = LlamaChatSession;
  }

  async receive(value: string): Promise<string | null> {
    if (this.session && this.context) {
      return new this.session({ context: this.context }).prompt(value);
    }

    return null;
  }
}
