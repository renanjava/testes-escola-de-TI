import type IUseCases from '@/application/usecases/use-cases.interface'
import type BakeryManagerEntity from '@/domain/entities/bakery-manager.entity'
import type ProductEntity from '@/domain/entities/product.entity'
import type IBakeryManagerRepository from '@/domain/interfaces/bakery-manager-repository.interface'
import type IProductRepository from '@/domain/interfaces/product.repository'
import { UsuarioNaoEGerenteError } from '@/application/errors/usuario-nao-gerente.error'

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
      throw new UsuarioNaoEGerenteError()
    }

    return await this.iProductRepository.createProduct(inputProduct)
  }
}
