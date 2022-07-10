import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

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
