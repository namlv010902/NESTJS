import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, ORIGIN_URL } = process.env;
  // console.log(process.env.ORIGIN_URL);

  // use validator
  app.useGlobalPipes(new ValidationPipe());
  // use cookie
  app.use(cookieParser());
  // use CORS
  app.enableCors({
    credentials: true, // Allow credentials (cookies, authorization headers,...)
  });
  // set global prefix
  app.setGlobalPrefix('api');
  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for my NestJS app')
    .setVersion('1.0')
    .addBearerAuth() // Nếu bạn sử dụng JWT hoặc token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app
    .listen(PORT)
    .then(() => console.log('Connected to port ' + PORT))
    .catch((error) => console.log('Error: ' + error));
}
bootstrap();
