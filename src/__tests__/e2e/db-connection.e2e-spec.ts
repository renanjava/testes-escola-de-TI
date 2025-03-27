import { AppModule } from '@/infrastructure/config/modules/app.module'
import { AuthRegisterDataBuilder } from '@/infrastructure/common/helper/auth/auth-register-data-builder'
import { Password } from '@/shared/common/utils/password'
import { AuthRegisterProps } from '@/infrastructure/dtos/user/auth-register.dto'
import { UserRepository } from '@/infrastructure/repositories/user/user.repository'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma, UserRole } from '@prisma/client'

describe('DB Connection E2E Tests', () => {
  let userProps: AuthRegisterProps
  let app: INestApplication

  beforeAll(async () => {
    userProps = AuthRegisterDataBuilder({} as AuthRegisterProps)

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
  })

  it('should connect to the database', async () => {
    const userMock = {
      realname: userProps.realname,
      username: userProps.username,
      email: userProps.email,
      password: await Password.generateEncrypted(userProps.password, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: UserRole.USER,
    } as Prisma.UserCreateInput

    const userRepository = app.get(UserRepository)
    const userCreated = await userRepository.createUser(userMock)

    const deletedUser = await userRepository.deleteUser({ id: userCreated.id })

    expect(userCreated).toHaveProperty('id')
    expect(deletedUser).toBeDefined()
  })
})
