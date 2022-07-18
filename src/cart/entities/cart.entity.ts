import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/User.entity';
import { Order } from './../../orders/entities/order.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  bookId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  total_price: number;

  @ManyToOne(() => Order, (order) => order.id, { onDelete: 'CASCADE' })
  items: Order;
}
