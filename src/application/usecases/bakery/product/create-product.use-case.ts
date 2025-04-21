import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import type ProductEntity from '@/domain/bakery/entities/product.entity'
import type IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import type IProductRepository from '@/domain/bakery/interfaces/product.repository'
import { UsuarioNaoEGerenteException } from '@/shared/common/exceptions/bakery/product/usuario-nao-gerente.exception'

export default class CreateProductUseCase implements IUseCases {
  constructor(
    private iProductRepository: IProductRepository<ProductEntity>,
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
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
      throw new UsuarioNaoEGerenteException()
    }

    return await this.iProductRepository.createProduct(inputProduct)
  }
}
