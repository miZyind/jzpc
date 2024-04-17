import { Module } from '@nestjs/common';

import { AnalyticService } from '#modules/analytic/analytic.service';

@Module({
  providers: [AnalyticService],
  exports: [AnalyticService],
})
export class AnalyticModule {}
