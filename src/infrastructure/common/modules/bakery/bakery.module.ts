import { Module } from '@nestjs/common'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { BakeryController } from '../../../controllers/bakery/bakery.controller'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { BakeryManagerService } from '@/infrastructure/services/bakery/bakery-manager.service'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { PrismaModule } from '../orm/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [BakeryController],
  providers: [
    BakeryService,
    BakeryRepositoryImpl,
    BakeryManagerService,
    BakeryManagerRepositoryImpl,
    UserRepositoryImpl,
  ],
  exports: [BakeryRepositoryImpl],
})
export class BakeryModule {}
