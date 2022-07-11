import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './../../comments/entities/comment.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty({ type: Comment, isArray: true })
  @OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[];

  @ApiProperty()
  @Column()
  desc: string;

  @ApiProperty()
  @Column()
  author: string;
}
