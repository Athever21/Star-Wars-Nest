import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetUserMiddleware } from './middlewares/getuser.middleware';
import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './users.model';
import { UsersRepository } from './users.repositroy';
import { UsersSerivce } from './services/users.service';
import { UsersIdController } from './controllers/usersId.controller';
import { JwtServices } from 'src/token/services/jwt.services';
import { AuthUser } from './middlewares/authUser';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, UsersIdController],
  providers: [UsersSerivce, UsersRepository, JwtServices],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserMiddleware).forRoutes(UsersIdController);

    consumer
      .apply(AuthUser)
      .exclude({ path: '/users/:id', method: RequestMethod.GET })
      .forRoutes(UsersIdController);
  }
}
