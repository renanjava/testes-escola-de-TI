import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/config/modules/app.module'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { GlobalExceptionFilter } from './model/common/filters/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new GlobalExceptionFilter());

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
  const environment = configService.get<string>('NODE_ENV') || 'development'
  let databaseUrl = configService.get<string>('DATABASE_URL')

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  await app.listen(PORT)
  if (environment === 'development') {
    Logger.log('Aplicação rodando em desenvolvimento')
    databaseUrl = databaseUrl?.replace('postgres:5432', 'localhost:5432')
  } else if (environment === 'production') {
    Logger.log('Aplicação rodando em produção')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    databaseUrl = databaseUrl?.replace('localhost:5432', 'postgres:5432')
  }
  Logger.log(`🚀 Server running on http://localhost:${PORT}`)
}

void bootstrap()
