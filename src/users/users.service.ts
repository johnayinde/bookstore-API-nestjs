import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  getUserById(id: number) {
    const user = this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  getUserByEmail(email: string) {
    const user = this.userRepo.findOne({ where: { email } });

    return user;
  }

  getUserByToken(token: string) {
    const user = this.userRepo.findOne({ where: { refreshToken: token } });

    return user;
  }

  async updateUserRefreshToken(id: number, refreshToken: any) {
    const user = await this.getUserById(id);

    return await this.userRepo.update(user.id, { refreshToken });
  }
}
