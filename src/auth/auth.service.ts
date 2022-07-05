import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthHelperService } from './auth-helper.service';
import { RefreshEntity } from './entities/refresh-entity';
import { jwtConstant } from './../constants/jwt.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { User } from 'src/users/entities/User.entity';
import { decode, sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly userService: UsersService,
    private authHelper: AuthHelperService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(data: CreateUserDto) {
    const userData = Object.assign(new User(), data);

    const userExist = await this.userService.getUserByEmail(data.email);
    console.log({ userExist });

    if (userExist)
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);

    const user = await this.usersRepo.save(userData);
    return user;
  }

  async login(email: string, password: string, values: RefreshEntity) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('user Not found');
    }
    const verifyPassword = await this.authHelper.comparePassword(
      password,
      user.password,
    );
    console.log({ verifyPassword });

    if (!verifyPassword) {
      throw new UnauthorizedException();
    }

    return await this.authHelper.refreshAndAccessToken(user, values);
  }

  async newRefreshToken(refreshToken: string) {
    console.log({ refreshToken });
    try {
      const user = await this.userService.getUserByToken(refreshToken);
      console.log({ user });

      if (!user) {
        throw new UnauthorizedException('user with the token does not exist');
      }

      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get(jwtConstant.refresh_secret),
      });

      console.log({ decoded });
      // console.log(decoded.header);
      // console.log(decoded.signature);

      if (typeof decoded === 'string') {
        return undefined;
      }

      const payload: RefreshEntity = {
        userId: decoded.userId,
        userAgent: decoded.userAgent,
        ipAddress: decoded.ipAddress,
      };
      console.log(payload);

      const access = this.jwtService.sign(payload, {
        secret: this.configService.get(jwtConstant.access_secret),
        expiresIn: this.configService.get<number>(jwtConstant.access_time),
      });

      return {
        accessToken: access,
      };
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException({ message: error.message });
    }
  }

  async logOut(refreshToken: string) {
    try {
      const user = await this.userService.getUserByToken(refreshToken);

      if (!user) {
        throw new NotFoundException();
      }

      await this.userService.updateUserRefreshToken(user.id, null);

      return new HttpException('log Out successfully', HttpStatus.OK);
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException({ message: error.message });
    }
  }
}
