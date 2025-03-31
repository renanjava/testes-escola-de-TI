import { Module } from '@nestjs/common'
import { BakeryManagerService } from '@/infrastructure/services/bakery/bakery-manager.service'
import { BakeryManagerController } from '../../../controllers/bakery/bakery-manager.controller'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'

@Module({
  controllers: [BakeryManagerController],
  providers: [
    BakeryManagerService,
    BakeryManagerRepositoryImpl,
    PrismaService,
    BakeryRepositoryImpl,
    UserRepositoryImpl,
  ],
})
export class BakeryManagerModule {}
