import { Module } from '@nestjs/common'
import { AdminController } from '@/infrastructure/controllers/admin/admin.controller'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import { BakeryService } from '@/infrastructure/services/bakery/bakery.service'
import { PrismaModule } from '../prisma/prisma.module'
import { UserUseCasesFactory } from '@/infrastructure/factories/user/user-use-cases.factory'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { ManagerUseCasesFactory } from '@/infrastructure/factories/user/manager-use-cases.factory'
import { BakeryManagerUseCasesFactory } from '@/infrastructure/factories/bakery/bakery-manager/bakery-manager-use-cases.factory'

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [
    ManagerUseCasesFactory,
    BakeryManagerUseCasesFactory,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    {
      provide: 'BakeryManagerRepository',
      useClass: BakeryManagerRepositoryImpl,
    },
    { provide: 'BakeryRepository', useClass: BakeryRepositoryImpl },
    BakeryManagerRepositoryImpl,
    BakeryRepositoryImpl,
    BakeryService,
    UserRepositoryImpl,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    UserUseCasesFactory,
  ],
})
export class AdminModule {}
