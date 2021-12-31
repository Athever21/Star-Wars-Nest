import { Body, Controller, Delete, Get, Param, Put, Req, UseInterceptors } from '@nestjs/common';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { AuthUserRequest } from '../middlewares/authUser';
import { UserRequest } from '../middlewares/getuser.middleware';
import MongooseClassSerializerInterceptor from '../mongooseClassSerializer.interceptor';
import { User } from '../users.model';
import { UsersSerivce } from "../services/users.service";

@Controller('/users/:id')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersIdController {
  constructor(private readonly usersService: UsersSerivce) {}

  @Get()
  getUserById(@Req() req: UserRequest) {
    return req.user;
  }
  
  @Put()
  async changeUser(@Req() req: AuthUserRequest, @Body() updateUserDto : UpdateUserDto) {
    return await this.usersService.changeUser(req.authUser, req.user, updateUserDto);
  }

  @Delete()
  async deleteUser(@Req() req: AuthUserRequest) {
    return await this.usersService.deleteUser(req.authUser, req.user);
  }
}
