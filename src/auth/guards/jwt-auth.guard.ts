import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    if (info instanceof JsonWebTokenError) {
      console.log(info);

      throw new UnauthorizedException('invalid token', info.message);
    }

    return user;
  }
}
