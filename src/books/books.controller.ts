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
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EditBookDto } from './dto/edit-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/decorator/public.decorator';
import { Book } from './entities/book.entity';

@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateBookDto,
    description: 'book request data',
    isArray: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  async createBook(
    @Body() body: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log({ file });

    return await this.bookService.postBook(body, file);
  }

  @Get()
  @Public()
  @ApiOkResponse({
    type: Book,
    description: 'Get all books',
    isArray: true,
  })
  async getAll() {
    return await this.bookService.findAllBooks();
  }

  @Get('/:id')
  @ApiOkResponse({
    type: Book,
    description: 'Get a single book',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);

    return await this.bookService.findOne(id);
  }

  @Put('/:id')
  @ApiOkResponse({
    type: Book,
    description: 'Update a single book',
  })
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
