import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Service } from '#app/app.constant';

export class AskDTO {
  @IsEnum(Service)
  readonly service!: Service;

  @IsNotEmpty()
  @IsString()
  readonly value!: string;
}
