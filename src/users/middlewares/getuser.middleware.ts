import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { UserDocument } from "../users.model";
import { UsersRepository } from "../users.repositroy";
import { ObjectId } from "mongoose";

export interface UserRequest extends Request {
  user?: UserDocument
}

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  constructor(private readonly usersRepository: UsersRepository) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = await this.usersRepository.getUserById(id);

    if (!user) throw new NotFoundException("user not found");

    req.user = user;

    return next();
  }
}