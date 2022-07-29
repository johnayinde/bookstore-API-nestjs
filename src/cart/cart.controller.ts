import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@ApiBearerAuth()
@ApiTags('carts')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiCreatedResponse({
    type: Cart,
    description: 'Cart created successfully',
  })
  @Post()
  async create(@Body() createCartDto: CreateCartDto, @GetUser() userId) {
    return await this.cartService.create(
      createCartDto.bookId,
      createCartDto.quantity,
      userId,
    );
  }

  @ApiOkResponse({
    type: Cart,
    description: 'Get all user carts',
    isArray: true,
  })
  @Get()
  async findAll(@GetUser() userId) {
    return await this.cartService.findAllCartsByUserId(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
