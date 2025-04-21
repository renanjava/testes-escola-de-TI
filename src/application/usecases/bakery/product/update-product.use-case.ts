import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import type ProductEntity from '@/domain/bakery/entities/product.entity'
import type IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import type IProductRepository from '@/domain/bakery/interfaces/product.repository'
import { ProdutoNaoEncontradoException } from '@/shared/common/exceptions/bakery/product/produto-nao-encontrado.exception'
import { UsuarioNaoEGerenteException } from '@/shared/common/exceptions/bakery/product/usuario-nao-gerente.exception'

export default class UpdateProductUseCase implements IUseCases {
  constructor(
    private iProductRepository: IProductRepository<ProductEntity>,
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
  ) {}

  async execute(
    managerId: string,
    productId: string,
    inputProduct: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
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

    return await this.iProductRepository.updateProduct({
      where: { id: productId },
      data: inputProduct,
    })
  }
}
