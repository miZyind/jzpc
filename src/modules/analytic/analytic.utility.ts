import { readFile } from 'fs/promises';

import {
  LASTNAME_INDEX,
  ZODIAC_SIGN_MAP,
  ZodiacSign,
} from '#modules/analytic/analytic.constant';

import type {
  PersonalDataAnalyzed,
  VHDict,
} from '#modules/analytic/analytic.interface';

const loadVHDict: (type: 'f' | 'l' | 'p') => Promise<VHDict> = async (type) =>
  Object.fromEntries(
    Object.entries(
      JSON.parse(
        await readFile(`./models/vh${type}.json`, { encoding: 'utf-8' }),
      ) as VHDict,
    ).map(([k, v]) => [k.toLowerCase(), v]),
  );

export async function parseName(
  data: string,
): Promise<Pick<PersonalDataAnalyzed, 'nh'>> {
  const [f, l] = await Promise.all([loadVHDict('f'), loadVHDict('l')]);

  return {
    nh: data
      .split(' ')
      .map((v, i) =>
        i === LASTNAME_INDEX
          ? l[v.toLowerCase()] ?? v
          : f[v.toLowerCase()] ?? v,
      )
      .join(''),
  };
}

export async function parseHometown(
  data: string,
): Promise<Pick<PersonalDataAnalyzed, 'hth'>> {
  return { hth: (await loadVHDict('p'))[data.toLowerCase()] ?? data };
}

/*
  eslint-disable
    complexity,
    no-nested-ternary,
    @typescript-eslint/no-magic-numbers
  -- Necessary for Zodiac Sign
*/
export function parseZodiacSign(
  date: Date,
): Pick<PersonalDataAnalyzed, 'zs' | 'zsh'> {
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
