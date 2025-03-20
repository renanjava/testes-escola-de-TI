import { AppModule } from '@/config/modules/app.module'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import * as nodemailer from 'nodemailer'

describe('Nodemailer Service E2E Tests', () => {
  it('should validate email connection', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    const app = moduleFixture.createNestApplication()
    const configService = app.get(ConfigService)

    const transporter = nodemailer.createTransport({
      host: configService.get<string>('NODEMAILER_TEST_HOST'),
      port: 587,
      secure: false,
      auth: {
        user: configService.get<string>('NODEMAILER_TEST_EMAIL'),
        pass: configService.get<string>('NODEMAILER_TEST_PASS'),
      },
    })

    const connectionVerify = () =>
      new Promise((resolver, reject) => {
        transporter.verify((error, success) => {
          if (error) {
            reject(error)
          } else {
            resolver(success)
          }
        })
      })
    const isConnected = true

    const validateConnection = await connectionVerify()

    expect(validateConnection).toStrictEqual(isConnected)
  })
})
