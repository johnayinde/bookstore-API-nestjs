import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Post()
  // @UsePipes(new ValidationPipe())

  // async postUser(@Body() body: CreateUserDto) {
  //    const user = this.userService.createUser(body);

  //    if (!user) {
  //       throw new
  //    }

  // }
}
