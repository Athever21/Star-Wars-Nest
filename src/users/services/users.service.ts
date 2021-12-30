import { BadRequestException, Injectable } from "@nestjs/common";
import CreateUserDto from "../dto/createUser.dto";
import { UsersRepository } from "../users.repositroy";

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
}