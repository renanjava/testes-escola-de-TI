import { AppModule } from '@/infrastructure/common/modules/app.module'
import { AuthRegisterDataBuilder } from '@/infrastructure/helper/databuilders/auth-register-data-builder'
import { Password } from '@/infrastructure/common/utils/password'
import type { AuthRegisterProps } from '@/application/props/auth-register.props'
import { UserRepositoryImpl } from '@/infrastructure/repositories/impl-user.repository'
import type { INestApplication } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { Prisma, User } from '@prisma/client'
import { UserRole } from '@prisma/client'

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

    const userRepository = app.get(UserRepositoryImpl)
    const userCreated = (await userRepository.createUser(userMock)) as User

    const deletedUser = await userRepository.deleteUser({ id: userCreated.id })

    expect(userCreated).toHaveProperty('id')
    expect(deletedUser).toBeDefined()
  })
})
