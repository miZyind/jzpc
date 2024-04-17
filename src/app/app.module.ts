import { ConfigModule } from 'nestjs-xion/config';

import { Module } from '@nestjs/common';

import { AppController } from '#app/app.controller';
import { AnalyticModule } from '#modules/analytic/analytic.module';
import { CohereModule } from '#modules/cohere/cohere.module';
import { LLAMAModule } from '#modules/llama/llama.module';

@Module({
  imports: [ConfigModule.forRoot(), AnalyticModule, CohereModule, LLAMAModule],
  controllers: [AppController],
})
export class AppModule {}
