import request from 'supertest';
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from 'src/config/modules/app.module'

describe('Rate Limit Integration Test', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('deve permitir até 10 requisições', async () => {
    for (let i = 0; i < 10; i++) {
      await request(app.getHttpServer()).get('/alguma-rota').expect(200)
    }
  })

  it('deve bloquear após 10 requisições', async () => {
    for (let i = 0; i < 10; i++) {
      await request(app.getHttpServer()).get('/alguma-rota')
    }

    const response = await request(app.getHttpServer()).get('/alguma-rota')
    expect(response.status).toBe(429)
    expect(response.body.error).toBe(
      'Muitas requisições. Tente novamente mais tarde.',
    )
  })
})
