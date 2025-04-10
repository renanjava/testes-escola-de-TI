import { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
