import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { GetUser } from 'src/auth/decorator/user.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({
    type: Order,
    description: 'Order created successfully',
  })
  @Post()
  async createOrder(@GetUser() userId) {
    console.log({ userId });

    return await this.ordersService.create(userId);
  }

  @ApiOkResponse({
    type: Order,
    description: 'Get user paided orders',
  })
  @Get()
  async findUserOrder(@GetUser() userId) {
    return await this.ordersService.findUserOrder(userId);
  }

  @ApiOkResponse({
    type: Order,
    description: 'Get user paided orders',
    isArray: true,
  })
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
