import { Module, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User.entity';
import { AuthHelperService } from './auth-helper.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.Strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthHelperService, JwtService, JwtStrategy],
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
