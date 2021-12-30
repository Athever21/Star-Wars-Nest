import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.model';
import { UsersRepository } from 'src/users/users.repositroy';
import { JwtServices } from './services/jwt.services';
import { TokenController } from './token.controller';
import { TokenServices } from './services/token.services';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [TokenController],
  providers: [TokenServices, UsersRepository, JwtServices],
})
export class TokenModule {}
