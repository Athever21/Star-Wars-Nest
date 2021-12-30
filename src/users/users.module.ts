import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { User, UserSchema } from "./users.model";
import { UsersRepository } from "./users.repositroy";
import { UsersSerivce } from "./users.service";

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersSerivce, UsersRepository]
})
export class UsersModule {}