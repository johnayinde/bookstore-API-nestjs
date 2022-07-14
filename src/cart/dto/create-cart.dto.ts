import { Book } from 'src/books/entities/book.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
