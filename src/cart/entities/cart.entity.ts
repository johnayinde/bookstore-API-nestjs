import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/User.entity';
import { Order } from './../../orders/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column()
  bookId: number;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  total_price: number;

  // @ApiProperty()
  @ManyToOne(() => Order, (order) => order.id, { onDelete: 'CASCADE' })
  items: Order;
}
