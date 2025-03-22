import { Module } from '@nestjs/common'
import { UserRepository } from '@/infrastructure/model/repositories/user.repository'
import { PrismaService } from '@/infrastructure/model/services/prisma.service'
import { UserController } from '@/infrastructure/presentation/controllers/user.controller'
import { UserService } from '@/infrastructure/model/services/user.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UserController],
  providers: [UserRepository, PrismaService, UserService, JwtService],
  exports: [UserRepository],
})
export class UserModule {}
