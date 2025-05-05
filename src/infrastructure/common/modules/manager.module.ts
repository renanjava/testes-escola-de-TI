import { ManagerUseCasesFactory } from '@/infrastructure/factories/manager-use-cases.factory'
import { Module } from '@nestjs/common'
import { UserModule } from './user.module'
import { UserRepositoryImpl } from '@/infrastructure/repositories/impl-user.repository'

@Module({
  imports: [UserModule],
  providers: [
    ManagerUseCasesFactory,
    { provide: 'UserRepository', useExisting: UserRepositoryImpl },
  ],
  exports: [ManagerUseCasesFactory],
})
export class ManagerModule {}
