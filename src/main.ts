import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = new Reflector();
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  const config = new DocumentBuilder()
    .setTitle('Online Bookstore API')
    .setDescription(
      'An API that exposed all endpoints to create delete edit a book',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}
bootstrap();
