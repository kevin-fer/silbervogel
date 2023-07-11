import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { VolService } from './vol.service';
import { VolController } from './vol.controller';
import { Vol, VolSchema } from './schemas/vol.schemas';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ClientsModule, Transport } from '@nestjs/microservices';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vol.name, schema: VolSchema }]),
    MongooseModule.forRoot(process.env.DB_URL_VOL),
    ClientsModule.register([
      {
        name: 'FLIGHT_TOKEN_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'flight_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [VolController],
  providers: [VolService],
  exports: [VolService],
})
export class VolModule {}
