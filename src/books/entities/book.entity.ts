import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './../../comments/entities/comment.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ type: 'simple-array', default: [], nullable: true })
  commentsId: number[];

  // @OneToMany(() => Comment, (comment) => comment.book)
  // @JoinColumn({ name: 'commentsId' })
  // comments: Comment[];

  @Column()
  desc: string;

  @Column()
  author: string;
}
