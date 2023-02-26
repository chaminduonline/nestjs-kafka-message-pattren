import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(){

  }

  async getHello(): Promise<String> {
    return 'Hello World!';
  }
}
