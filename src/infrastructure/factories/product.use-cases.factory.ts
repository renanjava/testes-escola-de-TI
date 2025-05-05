import CreateProductUseCase from '@/application/usecases/bakery/product/create-product.use-case'
import FindAllProductsUseCase from '@/application/usecases/bakery/product/find-all-products.use-case'
import FindOneProductUseCase from '@/application/usecases/bakery/product/find-one-product.use-case'
import RemoveProductUseCase from '@/application/usecases/bakery/product/remove-product.use-case'
import UpdateProductUseCase from '@/application/usecases/bakery/product/update-product.use-case'
import BakeryManagerEntity from '@/domain/entities/bakery-manager.entity'
import ProductEntity from '@/domain/entities/product.entity'
import IBakeryManagerRepository from '@/domain/interfaces/bakery-manager-repository.interface'
import IProductRepository from '@/domain/interfaces/product.repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ProductUseCasesFactory {
  constructor(
    @Inject('ProductRepository')
    private readonly iProductRepository: IProductRepository<ProductEntity>,
    @Inject('BakeryManagerRepository')
    private readonly iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  getCreateProductUseCaseInstance() {
    return new CreateProductUseCase(
      this.iProductRepository,
      this.iBakeryManagerRepository,
    )
  }

  getFindAllProductsUseCaseInstance() {
    return new FindAllProductsUseCase(this.iProductRepository)
  }

  getFindOneProductUseCaseInstance() {
    return new FindOneProductUseCase(this.iProductRepository)
  }

  getUpdateProductUseCaseInstance() {
    return new UpdateProductUseCase(
      this.iProductRepository,
      this.iBakeryManagerRepository,
    )
  }

  getRemoveProductUseCaseInstance() {
    return new RemoveProductUseCase(
      this.iProductRepository,
      this.iBakeryManagerRepository,
    )
  }
}
