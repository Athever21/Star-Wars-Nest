import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { JwtServices } from "src/token/services/jwt.services";
import { User, UserDocument } from "../users.model";

export interface AuthUserRequest extends Request {
  authUser: User,
  user?: UserDocument
}

@Injectable()
export class AuthUser implements NestMiddleware {
  constructor(private readonly jwtServices: JwtServices) {}
  
  use(req: AuthUserRequest, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      throw new UnauthorizedException("invalid authorization header");
    }

    const authUser = this.jwtServices.getDataFromToken(auth.substring(7), false) as User;

    req.authUser = authUser;

    return next();
  }
}