import { Module } from '@nestjs/common'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { UserController } from '@/infrastructure/controllers/user/user.controller'
import { UserService } from '@/infrastructure/services/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { PrismaModule } from '../orm/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserRepositoryImpl, UserService, JwtService],
  exports: [UserRepositoryImpl],
})
export class UserModule {}
