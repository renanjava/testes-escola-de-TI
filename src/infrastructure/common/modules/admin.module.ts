import { Module } from '@nestjs/common'
import { AdminController } from '@/infrastructure/controllers/admin.controller'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/impl-bakery-manager.repository'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/impl-bakery.repository'
import { PrismaModule } from './prisma.module'
import { UserRepositoryImpl } from '@/infrastructure/repositories/impl-user.repository'
import { UserModule } from './user.module'
import { BakeryManagerModule } from './bakery-manager.module'
import { BakeryModule } from './bakery.module'
import { ManagerModule } from './manager.module'

@Module({
  imports: [
    PrismaModule,
    UserModule,
    BakeryManagerModule,
    BakeryModule,
    UserModule,
    ManagerModule,
  ],
  controllers: [AdminController],
  providers: [
    { provide: 'UserRepository', useExisting: UserRepositoryImpl },
    {
      provide: 'BakeryManagerRepository',
      useExisting: BakeryManagerRepositoryImpl,
    },
    { provide: 'BakeryRepository', useExisting: BakeryRepositoryImpl },
  ],
})
export class AdminModule {}
