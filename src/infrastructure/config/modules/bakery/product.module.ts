import { Module } from '@nestjs/common'
import { ProductService } from '../../../services/bakery/product.service'
import { ProductController } from '../../../controllers/bakery/product.controller'
import { ProductRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-product.repository'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepositoryImpl,
    BakeryManagerRepositoryImpl,
    PrismaService,
  ],
})
export class ProductModule {}
