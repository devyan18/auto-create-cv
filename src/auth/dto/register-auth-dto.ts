import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class RegisterAuthDto {
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
