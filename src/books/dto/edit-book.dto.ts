import { IsNotEmpty, IsString } from 'class-validator';

export class EditBookDto {
  @IsString()
  title?: string;

  @IsString()
  image?: string;

  @IsString()
  desc?: string;

  @IsString()
  author?: string;
}
