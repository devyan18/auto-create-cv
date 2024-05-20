import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto implements Partial<User> {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  isOAuthAccount: boolean;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsUrl()
  avatar: string;
}
