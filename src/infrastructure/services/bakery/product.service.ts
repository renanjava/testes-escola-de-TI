/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { CreateProductDto } from '@/infrastructure/dtos/bakery/create-product.dto'
import { UpdateProductDto } from '@/infrastructure/dtos/bakery/update-product.dto'
import CreateProductUseCase from '@/application/bakery/usecases/create-product.use-case'
import { BakeryManagerRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery-manager.repository'
import { ProductRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-product.repository'
import ProductEntity from '@/domain/bakery/entities/product.entity'
import FindAllProductsUseCase from '@/application/bakery/usecases/find-all-products.use-case'
import FindOneProductUseCase from '@/application/bakery/usecases/find-one-product.use-case'
import UpdateProductUseCase from '@/application/bakery/usecases/update-product.use-case'
import RemoveProductUseCase from '@/application/bakery/usecases/remove-product.use-case'

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepositoryImpl,
    private readonly bakeryManagerRepository: BakeryManagerRepositoryImpl,
  ) {}
  async create(managerId: string, inputProduct: ProductEntity) {
    const createProductUseCase = new CreateProductUseCase(
      this.productRepository,
      this.bakeryManagerRepository,
    )
    return await createProductUseCase.execute(managerId, inputProduct)
  }

  async findAll() {
    const findAllProductsUseCase = new FindAllProductsUseCase(
      this.productRepository,
    )
    return await findAllProductsUseCase.execute()
  }

  async findOne(id: string) {
    const findOneProductUseCase = new FindOneProductUseCase(
      this.productRepository,
    )
    return await findOneProductUseCase.execute(id)
  }

  async update(
    managerId: string,
    productId: string,
    inputProduct: Partial<ProductEntity>,
  ) {
    const updateProductUseCase = new UpdateProductUseCase(
      this.productRepository,
      this.bakeryManagerRepository,
    )
    return await updateProductUseCase.execute(
      managerId,
      productId,
      inputProduct,
    )
  }

  async remove(managerId: string, productId: string) {
    const removeProductUseCase = new RemoveProductUseCase(
      this.productRepository,
      this.bakeryManagerRepository,
    )
    return await removeProductUseCase.execute(managerId, productId)
  }
}
