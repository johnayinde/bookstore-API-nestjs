import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { EditBookDto } from './dto/edit-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Express } from 'express';

@Injectable()
export class BooksService {
  constructor(
    private cloudinary: CloudinaryService,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}

  async postBook(data: CreateBookDto, file?: Express.Multer.File) {
    // const { url } = await this.cloudinary.uploadImage(file);

    // console.log({ url });

    // if (!url) {
    //   throw new NotFoundException('image not uploaded');
    // }

    // const book = Object.assign(new Book(), { ...data, image: url });
    const book = Object.assign(new Book(), { ...data });
    console.log(book);

    const newBook = await this.bookRepo.save(book).catch((e) => {
      console.log(e);

      throw new HttpException('Book not created', HttpStatus.BAD_REQUEST);
    });

    return newBook;
  }

  async findAllBooks() {
    const allBooks = await this.bookRepo.find({
      relations: {
        comments: true,
      },
    });
    console.log(allBooks.length);

    if (allBooks.length <= 0) {
      throw new HttpException('No books available!', HttpStatus.NOT_FOUND);
    }

    return allBooks;
  }

  async findOne(id: number) {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: {
        comments: true,
      },
    });

    if (!book) {
      throw new HttpException('No book with given Id!', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async findOneById(id: number) {
    const book = await this.bookRepo.findOne({
      where: { id },
    });

    if (!book) {
      throw new HttpException('No book with given Id!', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async updateBook(id: number, data: EditBookDto) {
    const book = await this.findOne(id);

    if (!book) {
      return new HttpException('No book with given Id!', HttpStatus.NOT_FOUND);
    }

    Object.assign(book, data);
    return this.bookRepo.save(book);
  }

  async deleteBook(id: number) {
    const book = await this.findOne(id);

    if (!book) {
      return new HttpException('No book with given Id!', HttpStatus.NOT_FOUND);
    }

    return this.bookRepo.delete(id);
  }
}
