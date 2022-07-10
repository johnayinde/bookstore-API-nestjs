import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { EditBookDto } from './dto/edit-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorator/public.decorator';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createBook(
    @Body() body: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log({ file });

    return await this.bookService.postBook(body, file);
  }

  @Public()
  @Get()
  async getAll() {
    return await this.bookService.findAllBooks();
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);

    return await this.bookService.findOne(id);
  }

  @Put('/:id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditBookDto,
  ) {
    console.log(typeof id);

    return await this.bookService.updateBook(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.bookService.deleteBook(id);
  }
}
