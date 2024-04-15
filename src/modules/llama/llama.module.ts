import { Module } from '@nestjs/common';

import { LLAMAService } from '#modules/llama/llama.service';

@Module({
  providers: [LLAMAService],
  exports: [LLAMAService],
})
export class LLAMAModule {}
