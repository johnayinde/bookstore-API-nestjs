import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    private readonly bookService: BooksService,
  ) {}
  async create(bookId: number, createCommentDto: CreateCommentDto) {
    //TODO: add user id to comment field

    const getBook = await this.bookService.findOne(bookId);
    console.log({ getBook });

    const comment = await this.commentRepo.create({
      content: createCommentDto.content,
      book: getBook,
    });

    const newComment = await this.commentRepo.save(comment);
    console.log(comment);

    if (!newComment) {
      throw new HttpException('Comment not created', HttpStatus.BAD_REQUEST);
    }

    // getBook.commentsId.push(newComment.id);
    // await this.bookRepo.update(getBook.id, {
    //   commentsId: [...getBook.commentsId, newComment.id],
    // });

    // getBook.commentsId = [...getBook.commentsId, newComment.id];

    // await this.bookRepo.save(getBook);
    // console.log({ getBook });

    return newComment;
  }

  async findAllComments() {
    const allComment = await this.commentRepo.find({
      relations: {
        book: true,
      },
    });
    console.log(allComment.length);

    if (allComment.length <= 0) {
      throw new HttpException('No books available!', HttpStatus.NOT_FOUND);
    }

    return allComment;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    const comment = await this.commentRepo.findOne({ where: { id } });

    if (!comment) {
      return new HttpException(
        'No comment with given Id!',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.commentRepo.delete(id);
  }
}
