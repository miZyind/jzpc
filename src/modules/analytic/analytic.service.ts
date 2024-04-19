import { readFile, writeFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';

import {
  DATA_INDENT,
  DATA_PATH,
  DEFAULT_PERSONAL_DATA,
  PERSONAL_DATA_KEY_MAP,
  PersonalDataBaseKey,
} from '#modules/analytic/analytic.constant';
import {
  parseHometown,
  parseName,
  parseZodiacSign,
} from '#modules/analytic/analytic.utility';

import type {
  AnalyticData,
  AnalyzeDTO,
} from '#modules/analytic/analytic.interface';
import type { CohereService } from '#modules/cohere/cohere.service';
import type { LLAMAService } from '#modules/llama/llama.service';

@Injectable()
export class AnalyticService {
  private data: AnalyticData = {};

  async onModuleInit(): Promise<void> {
    await this.init();
  }

  async analyze(
    { id, key, context }: AnalyzeDTO,
    service: CohereService | LLAMAService,
  ): Promise<void> {
    const data = this.data[id] ?? DEFAULT_PERSONAL_DATA;
    const ask = service.ask.bind(service);
    const value = await ask(
      `What's the ${PERSONAL_DATA_KEY_MAP[key]} from the context, answer only: "${context}"`,
    );
    let extra = {};

    if (value.length) {
      switch (key) {
        case PersonalDataBaseKey.Name: {
          extra = await parseName(value);
          break;
        }
        case PersonalDataBaseKey.Hometown: {
          extra = await parseHometown(value);
          break;
        }
        case PersonalDataBaseKey.DateOfBirth: {
          extra = parseZodiacSign(new Date(value));
          break;
        }
        case PersonalDataBaseKey.Job: {
          extra = {
            jh: await ask(`What is "${value}" in 繁體中文, answer only`),
          };
          break;
        }
        default:
          break;
      }
    }

    this.data[id] = { ...data, ...extra, [key]: value };
    await this.save();
  }

  private async init(): Promise<void> {
    try {
      this.data = JSON.parse(
        await readFile(DATA_PATH, { encoding: 'utf-8' }),
      ) as AnalyticData;
    } catch {
      await this.save();
    }
  }

  private async save(): Promise<void> {
    await writeFile(DATA_PATH, JSON.stringify(this.data, null, DATA_INDENT));
  }
}
