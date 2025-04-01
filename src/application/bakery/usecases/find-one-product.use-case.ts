import IUseCases from '@/application/interfaces/use-cases.interface'
import ProductEntity from '@/domain/bakery/entities/product.entity'
import IProductRepository from '@/domain/bakery/interfaces/product.repository'

export default class FindOneProductUseCase implements IUseCases {
  constructor(private iProductRepository: IProductRepository<ProductEntity>) {}

  async execute(id: string): Promise<ProductEntity | null> {
    return await this.iProductRepository.product(id)
  }
}
