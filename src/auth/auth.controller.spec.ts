import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            generateToken: jest
              .fn()
              .mockReturnValue({ access_token: 'mocked_token' }),
            hashPassword: jest.fn().mockResolvedValue('hashed_password'),
            comparePasswords: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile()

    authController = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })
})
