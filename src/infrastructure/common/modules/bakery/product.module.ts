import { Module } from '@nestjs/common'
import { ProductService } from '../../../services/bakery/product.service'
import { ProductController } from '../../../controllers/bakery/product.controller'
import { ProductRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-product.repository'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { PrismaModule } from '../orm/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepositoryImpl,
    BakeryManagerRepositoryImpl,
  ],
})
export class ProductModule {}
