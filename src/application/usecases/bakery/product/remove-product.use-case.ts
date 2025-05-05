import type IUseCases from '@/application/usecases/use-cases.interface'
import type BakeryManagerEntity from '@/domain/entities/bakery-manager.entity'
import type ProductEntity from '@/domain/entities/product.entity'
import type IBakeryManagerRepository from '@/domain/interfaces/bakery-manager-repository.interface'
import type IProductRepository from '@/domain/interfaces/product.repository'
import { ProdutoNaoEncontradoException } from '@/infrastructure/exceptions/bakery/product/produto-nao-encontrado.exception'
import { UsuarioNaoEGerenteException } from '@/infrastructure/exceptions/bakery/product/usuario-nao-gerente.exception'

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
      throw new ProdutoNaoEncontradoException()
    }

    const bakeryManagerFinded =
      await this.iBakeryManagerRepository.bakeryManager({
        managerId: managerId,
        bakeryId: productFinded.bakeryId,
      })

    if (!bakeryManagerFinded) {
      throw new UsuarioNaoEGerenteException()
    }

    return await this.iProductRepository.deleteProduct(productFinded)
  }
}
