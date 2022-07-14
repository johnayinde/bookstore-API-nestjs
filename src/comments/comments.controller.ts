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
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/user.decorator';
import { Public } from './../auth/decorator/public.decorator';
import { Comment } from './entities/comment.entity';

@ApiBasicAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({
    type: Comment,
    description: 'comment created successfully',
  })
  @Post('/:bookId')
  create(
    @GetUser() userId,
    @Body() createCommentDto: CreateCommentDto,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    return this.commentsService.create(bookId, createCommentDto, userId);
  }

  @ApiOkResponse({
    type: Comment,
    description: 'Book retrived successfully',
    isArray: true,
  })
  @Public()
  @Get()
  async getAll() {
    return await this.commentsService.findAllComments();
  }

  @ApiOkResponse({
    description: 'Book successfully deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
