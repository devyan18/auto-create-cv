import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth-dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { compareHash } from 'src/common/services';
import { GetTokensWithOAuthAccountDto } from './dto/getTokens-dto';

type SignInResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(payload: { id: string }) {
    console.log(payload);
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  async getUserByEmailAndPassword(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compareHash(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async signIn({ email, password }: LoginAuthDto): Promise<SignInResponse> {
    const user = await this.getUserByEmailAndPassword(email, password);
    console.log(user);
    const payload = { id: user.userId };

    const access_token = await this.generateAccessToken(payload);

    return { access_token };
  }

  async signUp(registerUserDto: RegisterAuthDto): Promise<SignInResponse> {
    const user = await this.usersService.findByEmail(registerUserDto.email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const newUser = await this.usersService.create(registerUserDto);

    const payload = { id: newUser.userId };

    const access_token = await this.generateAccessToken(payload);

    return { access_token };
  }

  async getMe({ email, password }: { email: string; password: string }) {
    const user = await this.getUserByEmailAndPassword(email, password);
    console.log(user);
    const payload = { id: user.userId };

    const access_token = await this.generateAccessToken(payload);
    console.log(access_token);
    return { user, access_token };
  }

  async oauth({ email, username, avatar }: GetTokensWithOAuthAccountDto) {
    const user = await this.usersService.findByEmail(email);

    if (user && !user.isOAuthAccount) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user) {
      const newUser = await this.usersService.create({
        email,
        isOAuthAccount: true,
        password: undefined,
        username,
        avatar,
      });

      if (!newUser) {
        throw new InternalServerErrorException('User not created');
      }

      const payload = { id: newUser.userId };

      const access_token = await this.generateAccessToken(payload);

      return { access_token };
    }

    if (user.isOAuthAccount) {
      const payload = { id: user.userId };

      const access_token = await this.generateAccessToken(payload);

      return { access_token };
    }
  }
}
