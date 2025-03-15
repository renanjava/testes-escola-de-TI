import { Module } from '@nestjs/common'
import { UserRepository } from '@/model/repositories/user.repository'
import { PrismaService } from '@/model/services/prisma.service'
import { UserController } from '@/controller/controllers/user.controller'
import { UserService } from '@/model/services/user.service'

@Module({
  controllers: [UserController],
  providers: [UserRepository, PrismaService, UserService],
  exports: [UserRepository],
})
export class UserModule {}
