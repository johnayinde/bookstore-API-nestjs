import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: Boolean, default: false })
  isAdmin: boolean;

  @Column({ nullable: true })
  refreshToken?: string;

  @BeforeInsert()
  public async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return this.password;
  }
}
