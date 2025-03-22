import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export default function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Café com Type')
    .setDescription('Descrição da API Café com Type')
    .setVersion('1.0')
    .addTag('padaria')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)
}
