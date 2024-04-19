import { Inject, Injectable, Logger } from '@nestjs/common';

import { AIConfig, AI_CONFIG } from '#configs';

import type { LlamaChatSession, LlamaContext } from 'node-llama-cpp';

@Injectable()
export class LLAMAService {
  private readonly logger = new Logger(LLAMAService.name);

  private readonly enable;

  private readonly model;

  private session: typeof LlamaChatSession | null = null;

  private context: LlamaContext | null = null;

  constructor(
    @Inject(AI_CONFIG)
    { llama: { enable, model } }: AIConfig,
  ) {
    this.enable = enable;
    this.model = model;
  }

  async onModuleInit(): Promise<void> {
    if (this.enable) {
      // eslint-disable-next-line no-eval -- https://github.com/microsoft/TypeScript/issues/43329
      const { LlamaContext, LlamaModel, LlamaChatSession } = (await eval(
        `import('node-llama-cpp')`,
      )) as typeof import('node-llama-cpp');

      this.context = new LlamaContext({
        model: new LlamaModel({ modelPath: `models/${this.model}.gguf` }),
      });
      this.session = LlamaChatSession;
    }
  }

  async ask(value: string): Promise<string> {
    this.logger.log(`Q [${value}]`);

    let answer = '';

    if (this.session && this.context) {
      answer = await new this.session({ context: this.context }).prompt(value);
    }

    this.logger.log(`A [${answer}]`);

    return answer;
  }
}
