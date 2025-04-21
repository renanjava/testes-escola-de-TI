import { Module } from '@nestjs/common'
import { ProductController } from '../../../../controllers/bakery/product.controller'
import { ProductRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-product.repository'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { PrismaModule } from '../../prisma/prisma.module'
import { ProductUseCasesFactory } from '@/infrastructure/factories/bakery/product/product.use-cases.factory'

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    ProductUseCasesFactory,
    { provide: 'ProductRepository', useClass: ProductRepositoryImpl },
    {
      provide: 'BakeryManagerRepository',
      useClass: BakeryManagerRepositoryImpl,
    },

    ProductRepositoryImpl,
    BakeryManagerRepositoryImpl,
  ],
})
export class ProductModule {}
