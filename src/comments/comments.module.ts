import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Book } from 'src/books/entities/book.entity';
import { BooksModule } from './../books/books.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([Comment, Book]),
    forwardRef(() => BooksModule),
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
