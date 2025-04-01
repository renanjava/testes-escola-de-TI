import IUseCases from '@/application/interfaces/use-cases.interface'
import ProductEntity from '@/domain/bakery/entities/product.entity'
import IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import IProductRepository from '@/domain/bakery/interfaces/product.repository'
import { ForbiddenException } from '@nestjs/common'
import { BakeryManager } from '@prisma/client'

export default class CreateProductUseCase implements IUseCases {
  constructor(
    private iProductRepository: IProductRepository<ProductEntity>,
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManager>,
  ) {}

  async execute(
    managerId: string,
    inputProduct: ProductEntity,
  ): Promise<ProductEntity> {
    const bakeryManagerFinded =
      await this.iBakeryManagerRepository.bakeryManager({
        managerId: managerId,
        bakeryId: inputProduct.bakeryId,
      })

    if (!bakeryManagerFinded) {
      throw new ForbiddenException('O usuário não é gerente dessa padaria')
    }

    return await this.iProductRepository.createProduct(inputProduct)
  }
}
