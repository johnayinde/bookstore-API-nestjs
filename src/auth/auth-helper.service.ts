import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstant } from 'src/constants/jwt.constant';
import { User } from 'src/users/entities/User.entity';
import { RefreshEntity } from './entities/refresh-entity';
import { UsersService } from './../users/users.service';
import { sign } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHelperService {
  constructor(
    private jwt: JwtService,
    private configService: ConfigService,
    private userRepo: UsersService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }

  async refreshAndAccessToken(user: User, values: RefreshEntity) {
    const refreshObject: RefreshEntity = {
      userId: user.id,
      ...values,
    };
    console.log({ refreshObject });
    console.log('at', await this.configService.get(jwtConstant.access_time));
    console.log('as', await this.configService.get(jwtConstant.access_secret));
    console.log('rt', await this.configService.get(jwtConstant.refresh_time));
    console.log('rs', await this.configService.get(jwtConstant.refresh_secret));

    const [access, refresh] = await Promise.all([
      this.jwt.sign(refreshObject, {
        secret: this.configService.get(jwtConstant.access_secret),
        expiresIn: this.configService.get<number>(jwtConstant.access_time),
      }),
      this.jwt.sign(refreshObject, {
        secret: this.configService.get(jwtConstant.refresh_secret),
        expiresIn: await this.configService.get(jwtConstant.refresh_time),
      }),
    ]);

    console.log({ access, refresh });
    await this.userRepo.updateUserRefreshToken(user.id, refresh);

    return {
      accessToken: access,
      refreshToken: refresh,
    };
  }
}
