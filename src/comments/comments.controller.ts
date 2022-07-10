import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { Public } from './../auth/decorator/public.decorator';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/:bookId')
  create(
    @GetUser() userId,
    @Body() createCommentDto: CreateCommentDto,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    return this.commentsService.create(bookId, createCommentDto, userId);
  }

  @Public()
  @Get()
  async getAll() {
    return await this.commentsService.findAllComments();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
