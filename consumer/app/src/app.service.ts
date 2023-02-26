import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatDto } from './dto/cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class AppService {

  constructor(){ }
  
  getHello(): string {
    return 'Hello World!';
  }

 

}
