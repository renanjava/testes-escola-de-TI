import { Module } from '@nestjs/common'
import { UserRepository } from '@/infrastructure/repositories/user/user.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { UserController } from '@/infrastructure/presentation/controllers/user/user.controller'
import { UserService } from '@/infrastructure/services/user/user.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UserController],
  providers: [UserRepository, PrismaService, UserService, JwtService],
  exports: [UserRepository],
})
export class UserModule {}
