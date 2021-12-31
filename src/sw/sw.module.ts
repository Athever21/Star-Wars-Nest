import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { GetDataFromSwApi } from './getDataFromSwApi';
import { SwController } from './sw.controller';
import { SwServices } from './sw.services';
import * as redisStore from 'cache-manager-redis-store';
import { AuthUser } from 'src/users/middlewares/authUser';
import { JwtServices } from 'src/token/services/jwt.services';

@Module({
  imports: [
    CacheModule.register<any>({
      store: redisStore,
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [SwController],
  providers: [SwServices, GetDataFromSwApi, JwtServices],
})
export class SwModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthUser).forRoutes(SwController);
  }
}
