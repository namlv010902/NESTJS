import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, ORIGIN_URL } = process.env
  // console.log(process.env.ORIGIN_URL);

  // use validator
  app.useGlobalPipes(new ValidationPipe()) 
  // use cookie
  app.use(cookieParser()) 
  // use CORS
  app.enableCors({  
    origin:  [ORIGIN_URL], // default origin url frontend
    credentials: true, // Allow credentials (cookies, authorization headers,...) 
  });
  // set global prefix
  app.setGlobalPrefix('api');
  
  await app.listen(PORT).then(()=>console.log('Connected to port '+PORT))
  .catch(error=>console.log('Error: '+error))
}
bootstrap();
