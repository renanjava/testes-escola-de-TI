import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const config = new DocumentBuilder()
    .setTitle('Café com Type')
    .setDescription('Descrição da API Café com Type')
    .setVersion('1.0')
    .addTag('padaria')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  app.use(helmet())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Muitas requisições, tente novamente mais tarde.',
    }),
  )

  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT') || 3000

  await app.listen(PORT)
  Logger.log(`🚀 Server running on http://localhost:${PORT}`)
}

void bootstrap()
