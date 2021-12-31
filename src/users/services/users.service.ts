import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import CreateUserDto from "../dto/createUser.dto";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { User, UserDocument } from "../users.model";
import { UsersRepository } from "../users.repositroy";
import * as argon2 from "argon2";

@Injectable()
export class UsersSerivce {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers() {
    return await this.usersRepository.getAllUsers();
  }

  async createUser(userData: CreateUserDto) {
    if (!userData.email || !userData.password) {
      throw new BadRequestException("missing email or password");
    }

    return await this.usersRepository.createUser(userData);
  }

  async changeUser(authUser: User, user: UserDocument, toChange: UpdateUserDto) {
    if (authUser._id !== user._id) throw new ForbiddenException("forbidden");

    if (toChange.email && user.email !== toChange.email) {
      user.email = toChange.email;
    }

    if (toChange.password) {
      user.password = await argon2.hash(toChange.password);
    }

    return user.save();
  }

  async deleteUser(authUser: User, user: UserDocument) {
    if (authUser._id !== user._id) throw new ForbiddenException("forbidden");

    await this.usersRepository.deleteUserById(user._id);

    return {success: true};
  }
}