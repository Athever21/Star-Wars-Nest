import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './users.model';
import * as argon2 from 'argon2';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers() {
    return await this.userModel.find({});
  }

  async createUser(userData: CreateUserDto) {
    userData.password = await argon2.hash(userData.password);
    const user = new this.userModel(userData);
    return user.save();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
