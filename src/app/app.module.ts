import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { TokenModule } from 'src/token/token.module';
import { SwModule } from 'src/sw/sw.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    TokenModule,
    SwModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
