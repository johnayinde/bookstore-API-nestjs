import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { EditBookDto } from './dto/edit-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Comment } from './../comments/entities/comment.entity';
import { CommentsService } from './../comments/comments.service';
import { CommentsController } from './../comments/comments.controller';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    // private readonly commentService: CommentsService,
  ) {}

  async postBook(data: CreateBookDto) {
    const book = Object.assign(new Book(), data);
    console.log(book);

    const newBook = await this.bookRepo.save(book).catch((e) => {
      console.log(e);

      throw new HttpException('Book not created', HttpStatus.BAD_REQUEST);
    });

    return newBook;
  }

  // async addComment(id, comment) {
  //   const book = Object.assign(new Book(), data);
  //   console.log(book);

  //   const newBook = await this.bookRepo.save(book).catch((e) => {
  //     console.log(e);

  //     throw new HttpException('Book not created', HttpStatus.BAD_REQUEST);
  //   });

  //   return newBook;
  // }

  async findAllBooks() {
    const allBooks = await this.bookRepo.find();
    console.log(allBooks.length);

    if (allBooks.length <= 0) {
      throw new HttpException('No books available!', HttpStatus.NOT_FOUND);
    }

    return allBooks;
  }

  async findOne(id: number) {
    const book = await this.bookRepo.findOne({ where: { id } });

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
    const comment = await this.commentRepo.find({ where: { bookId: book.id } });
    console.log('all comments', comment);

    await this.commentRepo.remove(comment);

    return this.bookRepo.delete(id);
  }
}
