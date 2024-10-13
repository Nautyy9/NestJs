import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //# name of the function can be anything
  //! only the first one of the both will run because they both are default GET
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  findAll(): string {
    //@ by default nestJs automatically handle error and send down to client with correct status code
    // throw new Error("I'm sorry, I'm sorry")

    try {
      return 'Hellow User';
    } catch (e) {
      throw new HttpException(
        `Sever Error: `,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }
}
