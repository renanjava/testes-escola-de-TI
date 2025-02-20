import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Muitas requisições, tente novamente mais tarde.',
    }),
  )

  app.enableCors({
    origin: ['https://seusite.com'],
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT') || 3000

  await app.listen(PORT)
  Logger.log(`🚀 Server running on http://localhost:${PORT}`)
}

void bootstrap()
