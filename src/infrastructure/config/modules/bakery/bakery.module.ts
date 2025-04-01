import { Module } from '@nestjs/common'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { BakeryController } from '../../../controllers/bakery/bakery.controller'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { BakeryManagerService } from '@/infrastructure/services/bakery/bakery-manager.service'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'

@Module({
  controllers: [BakeryController],
  providers: [
    BakeryService,
    BakeryRepositoryImpl,
    PrismaService,
    BakeryManagerService,
    BakeryManagerRepositoryImpl,
    UserRepositoryImpl,
  ],
  exports: [BakeryRepositoryImpl],
})
export class BakeryModule {}
