import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiBearerAuth('JWT')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
