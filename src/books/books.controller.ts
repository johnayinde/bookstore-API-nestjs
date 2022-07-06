import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Express } from 'express';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  async createBook(@Body() body: CreateBookDto) {
    return await this.bookService.postBook(body);
  }

  @Get()
  async getAll() {
    return await this.bookService.findAllBooks();
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);

    return await this.bookService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.bookService.deleteBook(id);
  }
}
