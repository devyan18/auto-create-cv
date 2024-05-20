import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class GetTokensWithOAuthAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsUrl()
  avatar: string;
}
