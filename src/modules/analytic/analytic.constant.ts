export const DATA_PATH = './data.log';
export enum PersonalDataBaseKey {
  Name = 'n',
  Nickname = 'nn',
  Hometown = 'ht',
  DateOfBirth = 'dob',
  Job = 'j',
}
export const PERSONAL_DATA_KEY_MAP = {
  [PersonalDataBaseKey.Name]: 'name',
  [PersonalDataBaseKey.Nickname]: 'nickname',
  [PersonalDataBaseKey.Hometown]: 'hometown',
  [PersonalDataBaseKey.DateOfBirth]: 'date of birth',
  [PersonalDataBaseKey.Job]: 'job',
};
export enum ZodiacSign {
  Unknown = 'Unknown',
  Aries = 'Bạch Dương',
  Taurus = 'Kim Ngưu',
  Gemini = 'Song Tử',
  Cancer = 'Cự Giải',
  Leo = 'Sư Tử',
  Virgo = 'Xử Nữ',
  Libra = 'Thiên Bình',
  Scorpio = 'Thiên Yết',
  Sagittarius = 'Nhân Mã',
  Capricorn = 'Ma Kết',
  Aquarius = 'Bảo Bình',
  Pisces = 'Song Ngư',
}
export const ZODIAC_SIGN_MAP = {
  [ZodiacSign.Unknown]: '未知',
  [ZodiacSign.Aries]: '牡羊座',
  [ZodiacSign.Taurus]: '金牛座',
  [ZodiacSign.Gemini]: '雙子座',
  [ZodiacSign.Cancer]: '巨蟹座',
  [ZodiacSign.Leo]: '獅子座',
  [ZodiacSign.Virgo]: '處女座',
  [ZodiacSign.Libra]: '天秤座',
  [ZodiacSign.Scorpio]: '天蠍座',
  [ZodiacSign.Sagittarius]: '射手座',
  [ZodiacSign.Capricorn]: '摩羯座',
  [ZodiacSign.Aquarius]: '水瓶座',
  [ZodiacSign.Pisces]: '雙魚座',
} as const;
export const DEFAULT_PERSONAL_DATA = {
  // Name
  n: '',
  // Name (Han)
  nh: '',
  // Nickname
  nn: '',
  // Hometown
  ht: '',
  // Hometown (Han)
  hth: '',
  // Date of Birth
  dob: '',
  // Zodiac Sign
  zs: ZodiacSign.Unknown,
  // Zodiac Sign (Han)
  zsh: ZODIAC_SIGN_MAP[ZodiacSign.Unknown],
  // Job
  j: '',
  // Facebook
  fb: '',
  // Instagram
  ig: '',
  // TikTok
  tt: '',
};
