import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    private readonly bookService: BooksService,
  ) {}

  async create(bookId: number, quantity: number, userId: number) {
    const book = await this.bookService.findOneById(bookId);

    console.log('found book', book);

    if (book) {
      const cartItems = await this.cartRepo.find({
        where: { userId: userId, bookId: book.id },
      });
      console.log({ cartItems });

      if (cartItems.length < 1) {
        const newCart = this.cartRepo.create({
          bookId: book.id,
          price: book.price,
          quantity,
          total_price: book.price * quantity,
          userId: userId,
        });
        console.log({ newCart });

        return await this.cartRepo.save(newCart);
      } else {
        const updateCart = {
          quantity: cartItems[0].quantity + quantity,
          total_price: cartItems[0].total_price + book.price * quantity,
        };
        console.log({ updateCart });

        await this.cartRepo.update(cartItems[0].id, updateCart);

        return this.cartRepo.findOneBy({ id: cartItems[0].id });
      }
    }
    throw new NotFoundException('Book does not exist');
  }

  async findAllCartsByUserId(userId: number) {
    const userCartItems = await this.cartRepo.find({
      where: { userId: userId },
    });

    if (userCartItems.length < 1) {
      throw new NotFoundException('User does not have any carts available');
    }
    return userCartItems;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} cart`;
  // }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  async removeAllUserCarts(userId: number) {
    const cartItems = await this.cartRepo.delete({ userId: userId });

    return cartItems;
  }
}
