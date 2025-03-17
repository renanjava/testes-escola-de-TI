import { Module } from '@nestjs/common'
import { UserRepository } from '@/model/repositories/user.repository'
import { PrismaService } from '@/model/services/prisma.service'
import { UserController } from '@/controller/controllers/user.controller'
import { UserService } from '@/model/services/user.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UserController],
  providers: [UserRepository, PrismaService, UserService, JwtService],
  exports: [UserRepository],
})
export class UserModule {}
