import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


@Controller()
export class AppController implements OnModuleInit{
  
constructor(@Inject('CONSUMER_SERVICE') private client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('my-topic');
    this.client.subscribeToResponseOf('cat-created');
  }


@Get('/produce')
async produceMessage(@Param() param:string): Promise<any> {

  let response  = await new Promise((resolve,reject)=>{
    this.client.send('my-topic', "Hi Chamindu").subscribe((res) => {
     resolve(res);
    });
  })
  return response;
}

@Get('/create-cat')
async createCat(): Promise<any> {

  let response  = await new Promise((resolve,reject)=>{
    this.client.send('cat-created', JSON.stringify({name:'Kity 1',age:4,breed:'male'})).subscribe((res) => {
     resolve(res);
    });
  })
  return response;
}

}

