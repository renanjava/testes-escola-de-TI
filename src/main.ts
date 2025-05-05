import { NestFactory } from '@nestjs/core'
import { AppModule } from './infrastructure/common/modules/app.module'
import { ConfigService } from '@nestjs/config'
import { Logger, NotFoundException, ValidationPipe } from '@nestjs/common'
import setupSwagger from '@/setup-swagger'
import setupSecurity from '@/setup-security'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  setupSwagger(app)
  setupSecurity(app)

  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })

  const configService = app.get(ConfigService)

  const applicationPort = configService.get<number>('PORT')
  if (!applicationPort) {
    throw new NotFoundException('Variável de ambiente PORT não definida')
  }

  await app.listen(applicationPort)
  Logger.log(`🚀 Server running on http://localhost:${applicationPort}`)
}

void bootstrap()
