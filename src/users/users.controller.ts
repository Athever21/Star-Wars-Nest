import { Controller, Get, UseInterceptors, Post, Body } from "@nestjs/common";
import CreateUserDto from "./dto/createUser.dto";
import MongooseClassSerializerInterceptor from "./mongooseClassSerializer.interceptor";
import { User } from "./users.model";
import { UsersSerivce } from "./users.service";

@Controller('/users')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersController {
  constructor(private readonly usersService: UsersSerivce) {}

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}