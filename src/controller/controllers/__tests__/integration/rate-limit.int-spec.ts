import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/config/modules/app.module';
import { PrismaService } from '@/model/services/prisma.service';
import rateLimit from 'express-rate-limit';

process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'postgresql://user:password@localhost:5432/testdb';

describe('Rate Limit Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication();

    app.use(
      rateLimit({
        windowMs: 60 * 1000,
        max: 4,
        message: 'Muitas requisições, tente novamente mais tarde.',
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve permitir 4 requisições sem bloqueio', async () => {
    for (let i = 0; i < 4; i++) {
      const response = await request(app.getHttpServer()).get('/');
      expect(response.status).not.toBe(429);
    }
  });

  it('deve bloquear após 4 requisições', async () => {
    for (let i = 0; i < 4; i++) {
      await request(app.getHttpServer()).get('/');
    }

    const response = await request(app.getHttpServer()).get('/');
    expect(response.status).toBe(429);
  });
});
