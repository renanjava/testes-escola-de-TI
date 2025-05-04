import { Module } from '@nestjs/common'
import { BakeryController } from '../../../controllers/bakery/bakery.controller'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { PrismaModule } from '../prisma/prisma.module'
import { ManagerUseCasesFactory } from '@/infrastructure/factories/user/manager-use-cases.factory'
import { BakeryUseCasesFactory } from '@/infrastructure/factories/bakery/bakery-use-cases.factory'
import { BakeryManagerUseCasesFactory } from '@/infrastructure/factories/bakery/bakery-manager/bakery-manager-use-cases.factory'

@Module({
  imports: [PrismaModule],
  controllers: [BakeryController],
  providers: [
    { provide: 'BakeryRepository', useClass: BakeryRepositoryImpl },
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    {
      provide: 'BakeryManagerRepository',
      useClass: BakeryManagerRepositoryImpl,
    },

    ManagerUseCasesFactory,
    BakeryUseCasesFactory,
    BakeryRepositoryImpl,
    BakeryManagerUseCasesFactory,
    BakeryManagerRepositoryImpl,
    UserRepositoryImpl,
  ],
  exports: [BakeryRepositoryImpl],
})
export class BakeryModule {}
