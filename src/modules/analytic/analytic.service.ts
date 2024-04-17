import { readFile, writeFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';

import {
  DATA_PATH,
  DEFAULT_PERSONAL_DATA,
  PERSONAL_DATA_KEY_MAP,
  ZODIAC_SIGN_MAP,
  ZodiacSign,
} from '#modules/analytic/analytic.constant';

import type {
  AnalyticData,
  AnalyzeDTO,
  PersonalDataAnalyzed,
} from '#modules/analytic/analytic.interface';

@Injectable()
export class AnalyticService {
  private data: AnalyticData = {};

  async onModuleInit(): Promise<void> {
    await this.init();
  }

  async analyze(
    { id, key, context }: AnalyzeDTO,
    method: (value: string) => Promise<string | null>,
  ): Promise<void> {
    const data = this.data[id] ?? DEFAULT_PERSONAL_DATA;
    const value = await method(
      `Please infer what's the ${PERSONAL_DATA_KEY_MAP[key]} from the sentence, only respond the answer: "${context}"`,
    );
    let extra = {};

    if (value !== null) {
      switch (key) {
        case 'dob': {
          extra = this.zodiacSign(new Date(value));
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
    await writeFile(DATA_PATH, JSON.stringify(this.data));
  }

  /*
    eslint-disable
      complexity,
      no-nested-ternary,
      @typescript-eslint/no-magic-numbers
    -- Necessary for Zodiac Sign
  */
  private zodiacSign(date: Date): Pick<PersonalDataAnalyzed, 'zs' | 'zsh'> {
    const x = date.getMonth() * 100 + date.getDate();
    const zs =
      x >= 221 && x <= 319
        ? ZodiacSign.Aries
        : x >= 320 && x <= 420
          ? ZodiacSign.Taurus
          : x >= 421 && x <= 520
            ? ZodiacSign.Gemini
            : x >= 521 && x <= 622
              ? ZodiacSign.Cancer
              : x >= 623 && x <= 722
                ? ZodiacSign.Leo
                : x >= 723 && x <= 922
                  ? ZodiacSign.Virgo
                  : x >= 823 && x <= 922
                    ? ZodiacSign.Libra
                    : x >= 923 && x <= 1021
                      ? ZodiacSign.Scorpio
                      : x >= 1022 && x <= 1121
                        ? ZodiacSign.Sagittarius
                        : x >= 1122 && x <= 19
                          ? ZodiacSign.Capricorn
                          : x >= 20 && x <= 118
                            ? ZodiacSign.Aquarius
                            : x >= 119 && x <= 220
                              ? ZodiacSign.Pisces
                              : ZodiacSign.Unknown;
    const zsh = ZODIAC_SIGN_MAP[zs];

    return { zs, zsh };
  }
  /*
    eslint-enable
      complexity,
      no-nested-ternary,
      @typescript-eslint/no-magic-numbers
  */
}
