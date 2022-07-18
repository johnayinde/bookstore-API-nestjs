import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

    console.log({ userCartItems });

    const totalPrice = userCartItems
      .map((item) => item.total_price)
      .reduce((a, b) => a + b);

    console.log({ totalPrice });

    const userOrder = await this.orderRepo.findOne({
      where: { userId, payed: false },
    });

    console.log(!userOrder);

    if (!userOrder) {
      console.log('create and save order');
      const newOrder = this.orderRepo.create({
        userId: userId,
        items: userCartItems,
        sub_total: totalPrice,
      });

      return await this.orderRepo.save(newOrder);
    } else {
      // console.log('user exist');

      throw new UnauthorizedException('User has any unpaid orders');
    }
  }

  async findUserOrder(userId: number) {
    const userOrder = await this.orderRepo.findOne({
      where: { userId },
    });

    console.log({ userOrder });

    if (!userOrder) {
      throw new NotFoundException('User does not have any orders available');
    }

    return userOrder;
  }

  async payUserOrders(orderId: number, userId?: number) {
    const userOrder = await this.orderRepo.findOneBy({ id: orderId });

    if (!userOrder) {
      throw new NotFoundException('Order does not exist');
    }

    await this.orderRepo.update(userOrder.id, { payed: true });
    // await this.cartService.removeAllUserCarts(userId);

    return await this.orderRepo.findBy({ id: orderId });
  }
}
