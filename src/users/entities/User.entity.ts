import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Book } from 'src/books/entities/book.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ type: Boolean, default: false })
  isAdmin: boolean;

  // // @Column()
  // @OneToMany(() => Cart, (cart) => cart.user)
  // carts: Cart[];

  @ApiProperty()
  @Column({ nullable: true })
  refreshToken?: string;

  @BeforeInsert()
  public async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return this.password;
  }
}
