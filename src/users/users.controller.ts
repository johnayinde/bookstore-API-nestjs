import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getme(@Req() req) {
    console.log(req.user);

    return this.userService.getUserById(req.user.userId);
  }
}
