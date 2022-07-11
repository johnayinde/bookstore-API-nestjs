import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditBookDto {
  @ApiPropertyOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional()
  @IsString()
  desc?: string;

  @ApiPropertyOptional()
  @IsString()
  author?: string;
}
