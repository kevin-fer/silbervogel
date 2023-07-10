/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VolModule } from './vol/vol.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [VolModule, ConfigModule.forRoot() ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
