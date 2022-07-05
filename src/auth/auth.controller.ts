import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './../users/dto/signIn-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body);

    return user;
  }

  @Post('/login')
  async login(@Body() dto: SigninDto, @Req() req, @Ip() ip: string) {
    return await this.authService.login(dto.email, dto.password, {
      userAgent: req.headers['user-agent'],
      ipAddress: ip,
    });
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return await this.authService.newRefreshToken(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: { refreshToken: string }) {
    return await this.authService.logOut(body.refreshToken);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getme(@Request() req) {
    console.log(req.userId);

    return this.userService.getUserById(req.user.userId);
  }
}
