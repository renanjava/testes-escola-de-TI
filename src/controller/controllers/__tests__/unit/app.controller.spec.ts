import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from '@/controller/controllers/app.controller'
import { AppService } from '@/model/services/app.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Esta é uma rota protegida!"', () => {
      expect(appController.getProtectedData()).toStrictEqual({
        message: 'Esta é uma rota protegida!',
      })
    })
  })
})
