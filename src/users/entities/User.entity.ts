import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('string')
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
