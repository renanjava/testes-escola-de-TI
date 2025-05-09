import { Module } from '@nestjs/common'
import { UserRepositoryImpl } from '@/infrastructure/repositories/impl-user.repository'
import { UserController } from '@/infrastructure/controllers/user.controller'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from './prisma.module'
import { UserUseCasesFactory } from '@/infrastructure/factories/user-use-cases.factory'

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [UserController],
  providers: [
    UserRepositoryImpl,
    UserUseCasesFactory,
    { provide: 'UserRepository', useExisting: UserRepositoryImpl },
  ],
  exports: [UserRepositoryImpl, UserUseCasesFactory],
})
export class UserModule {}
