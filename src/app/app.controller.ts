import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { Service } from '#app/app.constant';
import { ReceivePromptDTO } from '#app/dtos/receive-prompt.dto';
import { CohereService } from '#modules/cohere/cohere.service';
import { LLAMAService } from '#modules/llama/llama.service';

@Controller()
export class AppController {
  constructor(
    private readonly cohereService: CohereService,
    private readonly llamaService: LLAMAService,
  ) {}

  @Get('/')
  ping(): null {
    return null;
  }

  @Post('/prompts')
  @HttpCode(HttpStatus.OK)
  async receivePrompt(
    @Body() { service, value }: ReceivePromptDTO,
  ): Promise<string | null> {
    switch (service) {
      case Service.Cohere:
        return this.cohereService.receive(value);
      case Service.LLAMA:
        return this.llamaService.receive(value);
      default:
        return null;
    }
  }
}
