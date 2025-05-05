import type IUseCases from '@/application/usecases/use-cases.interface'
import type ProductEntity from '@/domain/entities/product.entity'
import type IProductRepository from '@/domain/interfaces/product.repository'

export default class FindAllProductsUseCase implements IUseCases {
  constructor(private iProductRepository: IProductRepository<ProductEntity>) {}

  async execute(): Promise<ProductEntity[]> {
    return await this.iProductRepository.products({})
  }
}
