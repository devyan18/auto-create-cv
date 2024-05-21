import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth-dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { Response } from 'express';
import { serialize } from 'cookie';
import { GetTokensWithOAuthAccountDto } from './dto/getTokens-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(
    @Body() registerAuthDto: RegisterAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.signUp(registerAuthDto);

    response.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    const cookie = serialize('access_token', `Bearer ${data.access_token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    response.setHeader('Set-Cookie', cookie);

    return data;
  }

  @Post('login')
  async signIn(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.signIn(loginAuthDto);

    response.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    const cookie = serialize('access_token', `Bearer ${data.access_token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
    });

    response.setHeader('Set-Cookie', cookie);

    return data;
  }

  @Post('me')
  async getMe(@Body() getMe: LoginAuthDto) {
    const data = await this.authService.getMe(getMe);
    return data;
  }

  @Post('oauth')
  async oauth(@Body() oauth: GetTokensWithOAuthAccountDto) {
    const data = await this.authService.oauth(oauth);
    return data;
  }
}
