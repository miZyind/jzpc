import { Module } from '@nestjs/common';

import { CohereService } from '#modules/cohere/cohere.service';

@Module({
  providers: [CohereService],
  exports: [CohereService],
})
export class CohereModule {}
