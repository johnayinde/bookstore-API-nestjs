import { Module, forwardRef } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CommentsModule } from './../comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Comment]),
    // forwardRef(() => CommentsModule),
  ],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
