import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  password: string;
}
