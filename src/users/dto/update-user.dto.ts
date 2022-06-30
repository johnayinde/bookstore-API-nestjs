import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsString()
  @IsEmail()
  email?: string;

  @IsNumberString()
  password?: string;
}
