import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/User.entity';
import { MailModule } from './mail/mail.module';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'product_db',
      // entities: ['dist/src/**/*.entity.{js,ts}'],
      entities: [User, Book, Comment],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    BooksModule,
    CommentsModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
