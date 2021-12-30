import { BadRequestException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersRepository } from 'src/users/users.repositroy';
import { LoginUserDto } from '../dto/loginUser.dto';
import * as argon2 from 'argon2';
import { JwtServices } from './jwt.services';

@Injectable()
export class TokenServices {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtServices: JwtServices,
  ) {}

  async createOrRefreshToken(
    req: Request,
    res: Response,
    loginUserDto: LoginUserDto,
  ) {
    const { email, password } = loginUserDto;
    const refreshToken = req.cookies['refreshToken'];

    if ((!email || !password) && !refreshToken) {
      throw new BadRequestException('missing username or password');
    }

    if (!refreshToken) {
      const user = await this.usersRepository.getUserByEmail(email);

      if (!user || !(await argon2.verify(user.password, password))) {
        throw new BadRequestException('invalid username or password');
      }

      const token = this.jwtServices.createTokenFromData(user.toJSON(), false);
      const rToken = this.jwtServices.createTokenFromData(user.toJSON(), true);

      res.cookie('refreshToken', rToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });

      return { token };
    }

    const payload = this.jwtServices.getDataFromToken(refreshToken, true);
    const newToken = this.jwtServices.createTokenFromData(payload, false);

    return { token: newToken };
  }

  deleteRefreshCookie(res: Response) {
    res.cookie('refreshToken', "", {
      maxAge: 0,
      httpOnly: true
    });

    return { success: true };
  }
}
