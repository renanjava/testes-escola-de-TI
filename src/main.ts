/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './infrastructure/config/modules/app.module'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'
import setupSwagger from '@/shared/setup-swagger'
import setupSecurity from '@/shared/setup-security'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
<<<<<<< HEAD
  app.useGlobalFilters(new GlobalExceptionFilter())
=======
>>>>>>> main

  setupSwagger(app)
  setupSecurity(app)

  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT') || 3000
  const environment = configService.get<string>('NODE_ENV') || 'development'
  let databaseUrl = configService.get<string>('DATABASE_URL')

  await app.listen(PORT)
  if (environment === 'development') {
    Logger.log('Aplicação rodando em desenvolvimento')
    databaseUrl = databaseUrl?.replace('postgres:5432', 'localhost:5432')
  } else if (environment === 'production') {
    Logger.log('Aplicação rodando em produção')
    databaseUrl = databaseUrl?.replace('localhost:5432', 'postgres:5432')
  }
  Logger.log(`🚀 Server running on http://localhost:${PORT}`)
}

void bootstrap()
