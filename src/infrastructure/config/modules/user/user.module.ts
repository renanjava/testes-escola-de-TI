import { Module } from '@nestjs/common'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/user.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { UserController } from '@/infrastructure/controllers/user/user.controller'
import { UserService } from '@/infrastructure/services/user/user.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UserController],
  providers: [UserRepositoryImpl, PrismaService, UserService, JwtService],
  exports: [UserRepositoryImpl],
})
export class UserModule {}
