import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtServices {
  private readonly secret = process.env.jwt_secret || 'secret';
  private readonly secret_refresh  = process.env.jwt_secret_refresh || 'refresh_secret';

  createTokenFromData = (payload: any, refresh: boolean) => {
    const opts = {
      expiresIn: refresh ? '7d' : '5m',
    };

    delete payload.exp;
    delete payload.iat;

    return jwt.sign(payload, refresh ? this.secret_refresh : this.secret, opts);
  };

  getDataFromToken = (token: string, refresh: boolean) => {
    try {
      return jwt.verify(token, refresh ? this.secret_refresh : this.secret);
    } catch {
      throw new BadRequestException('invalid token');
    }
  };
}
