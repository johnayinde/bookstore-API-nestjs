import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'rxjs';

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

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
