import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), BooksModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
