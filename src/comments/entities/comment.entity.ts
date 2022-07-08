import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './../../books/entities/book.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // @Column({ nullable: true })
  // bookId: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => Book, (book) => book.comments, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'bookId' })
  book: Book;
}
