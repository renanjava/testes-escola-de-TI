import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

export default function setupSecurity(app: INestApplication): void {
  app.use(helmet())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Muitas requisições, tente novamente mais tarde.',
    }),
  )
}
