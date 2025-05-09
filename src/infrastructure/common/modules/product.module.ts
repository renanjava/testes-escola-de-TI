import { Module } from '@nestjs/common'
import { ProductController } from '../../controllers/product.controller'
import { ProductRepositoryImpl } from '@/infrastructure/repositories/impl-product.repository'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/impl-bakery-manager.repository'
import { PrismaModule } from './prisma.module'
import { ProductUseCasesFactory } from '@/infrastructure/factories/product.use-cases.factory'
import { BakeryManagerModule } from './bakery-manager.module'

@Module({
  imports: [PrismaModule, BakeryManagerModule],
  controllers: [ProductController],
  providers: [
    ProductUseCasesFactory,
    ProductRepositoryImpl,
    { provide: 'ProductRepository', useExisting: ProductRepositoryImpl },
    {
      provide: 'BakeryManagerRepository',
      useExisting: BakeryManagerRepositoryImpl,
    },
  ],
})
export class ProductModule {}
