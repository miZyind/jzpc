import type {
  PersonalDataBaseKey,
  ZODIAC_SIGN_MAP,
  ZodiacSign,
} from '#modules/analytic/analytic.constant';

export interface AnalyzeDTO {
  id: string;
  key: PersonalDataBaseKey;
  context: string;
}
export type PersonalData = PersonalDataAnalyzed & PersonalDataBase;
export interface PersonalDataBase {
  // Name
  n: string;
  // Nickname
  nn: string;
  // Hometown
  ht: string;
  // Date of Birth
  dob: string;
  // Job
  j: string;
}
export interface PersonalDataAnalyzed {
  // Name (Han)
  nh: string;
  // Nickname
  nn: string;
  // Hometown (Han)
  hth: string;
  // Zodiac Sign
  zs: ZodiacSign;
  // Zodiac Sign (Han)
  zsh: (typeof ZODIAC_SIGN_MAP)[ZodiacSign];
  // Facebook
  fb: string;
  // Instagram
  ig: string;
  // TikTok
  tt: string;
}
export type AnalyticData = Record<string, PersonalData | undefined>;
