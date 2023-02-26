import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cat, CatSchema } from './schemas/cat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    MongooseModule.forRoot('mongodb://mongodb:27017/nest'),
    ClientsModule.register([
      {
        name: 'PRODUCER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'producer',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'my-consumer'
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
