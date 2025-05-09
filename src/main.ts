import { NestFactory } from '@nestjs/core'
import { AppModule } from './infrastructure/common/modules/app.module'
import { ConfigService } from '@nestjs/config'
import { Logger, NotFoundException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const configService = app.get(ConfigService)

  const applicationPort = configService.get<number>('PORT')
  if (!applicationPort) {
    throw new NotFoundException('Variável de ambiente PORT não definida')
  }

  await app.listen(applicationPort)
  Logger.log(`🚀 Server running on http://localhost:${applicationPort}`)
}

void bootstrap()
