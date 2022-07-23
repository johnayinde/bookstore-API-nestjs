import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column()
  sub_total: number;

  @ApiProperty({ type: Boolean, default: false })
  @Column({ default: false })
  payed: boolean;

  @ApiProperty({ type: Cart, isArray: true })
  @OneToMany(() => Cart, (cart) => cart.items)
  items: Cart[];
}
