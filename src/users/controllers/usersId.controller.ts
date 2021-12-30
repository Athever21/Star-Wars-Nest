import { Body, Controller, Get, Param, Put, Req, UseInterceptors } from '@nestjs/common';
import { UserRequest } from '../middlewares/getuser.middleware';
import MongooseClassSerializerInterceptor from '../mongooseClassSerializer.interceptor';
import { User } from '../users.model';

@Controller('/users/:id')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersIdController {
  

  @Get()
  getUserById(@Req() req: UserRequest) {
    return req.user;
  }
  
  // @Put()
  // async changeUser(@Req() req: UserRequest, @Body() updateUserDto : UpdateUserDto) {
  //   return await t
  // }
}
