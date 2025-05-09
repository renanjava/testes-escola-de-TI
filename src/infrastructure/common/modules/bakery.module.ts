import { Module } from '@nestjs/common'
import { BakeryController } from '../../controllers/bakery.controller'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/impl-bakery.repository'
import { UserRepositoryImpl } from '@/infrastructure/repositories/impl-user.repository'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/impl-bakery-manager.repository'
import { PrismaModule } from './prisma.module'
import { BakeryUseCasesFactory } from '@/infrastructure/factories/bakery-use-cases.factory'
import { UserModule } from './user.module'
import { BakeryManagerModule } from './bakery-manager.module'

@Module({
  imports: [PrismaModule, UserModule, BakeryManagerModule],
  controllers: [BakeryController],
  providers: [
    BakeryUseCasesFactory,
    BakeryRepositoryImpl,
    { provide: 'BakeryRepository', useExisting: BakeryRepositoryImpl },
    { provide: 'UserRepository', useExisting: UserRepositoryImpl },
    {
      provide: 'BakeryManagerRepository',
      useExisting: BakeryManagerRepositoryImpl,
    },
  ],
  exports: [BakeryRepositoryImpl, BakeryUseCasesFactory],
})
export class BakeryModule {}
