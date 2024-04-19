import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Service } from '#app/app.constant';
import { PersonalDataBaseKey } from '#modules/analytic/analytic.constant';

export class AnalyzeDTO {
  @IsEnum(Service)
  readonly service!: Service;

  @IsNotEmpty()
  @IsString()
  readonly id!: string;

  @IsEnum(PersonalDataBaseKey)
  readonly key!: PersonalDataBaseKey;

  @IsNotEmpty()
  @IsString()
  readonly context!: string;
}
