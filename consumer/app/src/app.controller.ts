import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatDto } from './dto/cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Controller()
export class AppController{
  constructor(private readonly appService: AppService,@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  @MessagePattern('my-topic')
  async handleMessage(@Payload() message: string): Promise<string> {
    console.log(`Received message: ${message}`);
    // Process the message here
    return `Processed message: ${message}`;
  }

  @MessagePattern("cat-created")
  async create(@Payload() createCatDto: CatDto): Promise<Cat>{
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

}

