import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from './../cart/cart.service';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private readonly cartService: CartService,
  ) {}
  async create(userId: number) {
    const userCartItems = await this.cartService.findAllCartsByUserId(userId);

    const totalPrice = userCartItems
      .map((item) => item.total_price)
      .reduce((a, b) => a + b);
    const userOrder = await this.findUserOrder(userId);

    if (userOrder) {
      throw new HttpException(
        'User already have unpaid orders',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newOrder = this.orderRepo.create({
      userId: userId,
      items: userCartItems,
      sub_total: totalPrice,
    });

    return await this.orderRepo.save(newOrder);
  }

  async findUserOrder(userId: number) {
    return await this.orderRepo.findOne({ where: { userId } });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
