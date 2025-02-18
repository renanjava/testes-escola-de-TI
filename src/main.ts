import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100, 
      message: 'Número de requisições excedido, tente novamente mais tarde.',
    }),
  );

  app.enableCors({
    origin: ['https://seusite.com'], 
    methods: 'GET, POST, PUT, DELETE',
    credentials: true, 
  });

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;
  
  console.log('JWT_SECRET:', configService.get<string>('JWT_SECRET'));

  await app.listen(PORT);
  
}

void bootstrap();

