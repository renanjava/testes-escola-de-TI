import type IUseCases from '@/application/interfaces/use-cases.interface'
import type ProductEntity from '@/domain/bakery/entities/product.entity'
import type IProductRepository from '@/domain/bakery/interfaces/product.repository'

export default class FindAllProductsUseCase implements IUseCases {
  constructor(private iProductRepository: IProductRepository<ProductEntity>) {}

  async execute(): Promise<ProductEntity[]> {
    return await this.iProductRepository.products({})
  }
}
