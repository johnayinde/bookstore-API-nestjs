import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@GetUser() userId) {
    console.log({ userId });

    return await this.ordersService.create(userId);
  }

  @Get()
  async findUserOrder(@GetUser() userId) {
    return await this.ordersService.findUserOrder(userId);
  }

  @Patch(':orderId')
  async update(@Param('orderId') orderId: number, @GetUser() userId) {
    return await this.ordersService.payUserOrders(orderId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ordersService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
