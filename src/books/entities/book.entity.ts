import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  desc: string;

  @Column()
  author: string;
}
