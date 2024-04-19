import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AnalyzeDTO } from '#app/dtos/analyze.dto';
import { AskDTO } from '#app/dtos/ask.dto';
import { RemarkDTO } from '#app/dtos/remark.dto';
import { AnalyticService } from '#modules/analytic/analytic.service';
import { CohereService } from '#modules/cohere/cohere.service';
import { LLAMAService } from '#modules/llama/llama.service';

@Controller()
export class AppController {
  constructor(
    private readonly analyticService: AnalyticService,
    private readonly cohere: CohereService,
    private readonly llama: LLAMAService,
  ) {}

  @Get('/')
  ping(): null {
    return null;
  }

  @Post('/prompts')
  @HttpCode(HttpStatus.OK)
  async ask(@Body() { service, value }: AskDTO): Promise<string> {
    return this[service].ask(value);
  }

  @Post('/analytics')
  @HttpCode(HttpStatus.OK)
  async analyze(
    @Body() { service, id, key, context }: AnalyzeDTO,
  ): Promise<void> {
    return this.analyticService.analyze(this[service], id, key, context);
  }

  @Post('/remarks')
  @HttpCode(HttpStatus.OK)
  async remark(@Body() { id, key, value }: RemarkDTO): Promise<void> {
    return this.analyticService.remark(id, key, value);
  }
}
