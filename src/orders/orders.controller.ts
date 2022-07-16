import { Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { GetUser } from 'src/auth/decorator/user.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@GetUser() userId) {
    return this.ordersService.create(userId);
  }

  @Get()
  findAll(@GetUser() userId) {
    return this.ordersService.findUserOrder(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ordersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
