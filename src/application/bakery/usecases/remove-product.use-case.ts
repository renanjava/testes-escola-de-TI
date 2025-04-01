import IUseCases from '@/application/interfaces/use-cases.interface'
import BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import ProductEntity from '@/domain/bakery/entities/product.entity'
import IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import IProductRepository from '@/domain/bakery/interfaces/product.repository'
import { ForbiddenException, NotFoundException } from '@nestjs/common'

export default class RemoveProductUseCase implements IUseCases {
  constructor(
    private iProductRepository: IProductRepository<ProductEntity>,
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  async execute(managerId: string, productId: string): Promise<ProductEntity> {
    const productFinded = await this.iProductRepository.product({
      id: productId,
    })

    if (!productFinded) {
      throw new NotFoundException('Produto não encontrado')
    }

    const bakeryManagerFinded =
      await this.iBakeryManagerRepository.bakeryManager({
        managerId: managerId,
        bakeryId: productFinded.bakeryId,
      })

    if (!bakeryManagerFinded) {
      throw new ForbiddenException('O usuário não é gerente dessa padaria')
    }

    return await this.iProductRepository.deleteProduct(productFinded)
  }
}
