import { IsNotEmpty, IsString } from 'class-validator';

import type { PersonalData } from '#modules/analytic/analytic.interface';

export class RemarkDTO {
  @IsNotEmpty()
  @IsString()
  readonly id!: string;

  @IsNotEmpty()
  @IsString()
  readonly key!: keyof PersonalData;

  @IsNotEmpty()
  @IsString()
  readonly value!: string;
}
