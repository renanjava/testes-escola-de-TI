import { Module } from '@nestjs/common'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { UserController } from '@/infrastructure/controllers/user/user.controller'
import { JwtService } from '@nestjs/jwt'
import { PrismaModule } from '../prisma/prisma.module'
import { UserUseCasesFactory } from '@/infrastructure/factories/user/user-use-cases.factory'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserRepositoryImpl,
    JwtService,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    UserUseCasesFactory,
  ],
  exports: [UserRepositoryImpl],
})
export class UserModule {}
