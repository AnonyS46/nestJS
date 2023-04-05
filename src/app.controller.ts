import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/name')
  // getName(): string {
  //   return 'Lê Mạnh Cường';
  // }

  // @Get('/:id')
  // findOne(@Param('id') param): string {
  //   return `Id : ${param}`;
  // }
  // @Post()
  // createOne(@Body() student: Student) {
  //   return student;
  // }
}
