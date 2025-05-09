import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/impl-bakery-manager.repository'
import { forwardRef, Module } from '@nestjs/common'
import { PrismaModule } from './prisma.module'
import { BakeryManagerUseCasesFactory } from '@/infrastructure/factories/bakery-manager-use-cases.factory'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/impl-bakery.repository'
import { UserRepositoryImpl } from '@/infrastructure/repositories/impl-user.repository'
import { BakeryModule } from './bakery.module'
import { UserModule } from './user.module'

@Module({
  imports: [PrismaModule, forwardRef(() => BakeryModule), UserModule],
  controllers: [],
  providers: [
    BakeryManagerRepositoryImpl,
    BakeryManagerUseCasesFactory,
    {
      provide: 'BakeryManagerRepository',
      useExisting: BakeryManagerRepositoryImpl,
    },
    {
      provide: 'BakeryRepository',
      useExisting: BakeryRepositoryImpl,
    },
    {
      provide: 'UserRepository',
      useExisting: UserRepositoryImpl,
    },
  ],
  exports: [BakeryManagerRepositoryImpl, BakeryManagerUseCasesFactory],
})
export class BakeryManagerModule {}
