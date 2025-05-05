import type IUseCases from '@/application/usecases/use-cases.interface'
import type ProductEntity from '@/domain/entities/product.entity'
import type IProductRepository from '@/domain/interfaces/product.repository'

export default class FindOneProductUseCase implements IUseCases {
  constructor(private iProductRepository: IProductRepository<ProductEntity>) {}

  async execute(id: string): Promise<ProductEntity | null> {
    return await this.iProductRepository.product(id)
  }
}
