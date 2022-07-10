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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signIn-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './decorator/public.decorator';
import { GetUser } from './decorator/user.decorator';
import { User } from 'src/users/entities/User.entity';
import { loginReturn, refreshReturn } from './interfaces/doc.return';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOperation({ description: 'create user endpoint' })
  @ApiCreatedResponse({
    type: User,
    description: 'The record has been successfully created.',
  })
  @Public()
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body);

    return user;
  }

  @ApiOkResponse({ type: loginReturn })
  @Public()
  @Post('/login')
  async login(@Body() dto: SigninDto, @Req() req, @Ip() ip: string) {
    return await this.authService.login(dto.email, dto.password, {
      userAgent: req.headers['user-agent'],
      ipAddress: ip,
    });
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: refreshReturn,
    description: 'RefreshToken successfully created',
  })
  @Post('refresh')
  async refreshToken(@Body() body: refreshReturn) {
    return await this.authService.newRefreshToken(body.refreshToken);
  }

  // @Public()
  @Delete('logout')
  async logout(@Body() body: refreshReturn) {
    return await this.authService.logOut(body.refreshToken);
  }
  @ApiOkResponse({
    type: User,
    description: 'current logedIn user crendential',
  })
  @Get('/me')
  async getme(@GetUser() userId) {
    console.log(userId);

    return this.userService.getUserById(userId);
  }
}
