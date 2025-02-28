import { Module } from '@nestjs/common'
import { UserRepository } from '@/model/repositories/user.repository'
import { PrismaService } from '@/model/services/prisma.service'

@Module({
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class UserModule {}
