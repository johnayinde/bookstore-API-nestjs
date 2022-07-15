import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Cart, (cart) => cart.id)
  items: Cart[];

  @Column()
  userId: number;

  @Column()
  sub_total: number;

  @Column({ default: false })
  payed: boolean;
}
