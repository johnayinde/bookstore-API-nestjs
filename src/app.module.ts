import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/User.entity';
import { MailModule } from './mail/mail.module';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url:
          configService.get('ENV') === 'development'
            ? ''
            : configService.get('DATABASE_URL'),
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        ssl:
          configService.get('ENV') === 'development'
            ? false
            : { rejectUnauthorized: false },
        entities: ['dist/**/*.entity.{js,ts}'],
        // entities: [User, Book, Comment, Cart],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    MailModule,
    BooksModule,
    CommentsModule,
    CloudinaryModule,
    CartModule,
    OrdersModule,
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
