import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { EditBookDto } from './dto/edit-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  async findAllBooks() {
    const allBooks = await this.bookRepo.find();

    if (!allBooks) {
      throw new HttpException('No books available!', HttpStatus.NOT_FOUND);
    }

    return allBooks;
  }

  async findById(id: number) {
    const book = await this.bookRepo.findOne({ where: { id } });

    if (!book) {
      throw new HttpException('No book with given Id!', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async updateBook(id: number, data: EditBookDto) {
    const book = await this.findById(id);

    if (!book) {
      return new HttpException('No book with given Id!', HttpStatus.NOT_FOUND);
    }

    Object.assign(book, data);
    return this.bookRepo.save(book);
  }

  async deleteBook(id: number) {
    const book = await this.findById(id);

    if (!book) {
      return new HttpException('No book with given Id!', HttpStatus.NOT_FOUND);
    }
    return this.bookRepo.delete(id);
  }
}
