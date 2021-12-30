import { Body, Controller, Delete, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/loginUser.dto';
import { TokenServices } from './services/token.services';

@Controller('/token')
export class TokenController {
  constructor(private readonly tokenServices: TokenServices) {}

  @Post()
  createOrRefreshToken(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.tokenServices.createOrRefreshToken(req, res, loginUserDto);
  }

  @Delete() 
  deleteRefreshCookie(@Res({passthrough: true}) res: Response) {
    return this.tokenServices.deleteRefreshCookie(res);
  }
}
