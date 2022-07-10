import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly bookService: BooksService,
  ) {}

  async create(
    bookId: number,
    createCommentDto: CreateCommentDto,
    userId: number,
  ) {
    //TODO: add user id to comment field

    const getBook = await this.bookService.findOne(bookId);
    console.log({ getBook });

    const comment = this.commentRepo.create({
      content: createCommentDto.content,
      book: getBook,
      userId: userId,
    });

    const newComment = await this.commentRepo.save(comment);
    console.log(comment);

    if (!newComment) {
      throw new HttpException('Comment not created', HttpStatus.BAD_REQUEST);
    }

    return newComment;
  }

  async findAllComments() {
    const allComment = await this.commentRepo.find({
      relations: {
        book: true,
      },
    });

    if (allComment.length <= 0) {
      throw new HttpException('No books available!', HttpStatus.NOT_FOUND);
    }

    return allComment;
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
