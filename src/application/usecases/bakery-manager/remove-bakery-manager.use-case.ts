/* eslint-disable @typescript-eslint/no-unused-vars */
import type IUseCases from '@/application/usecases/use-cases.interface'
import type BakeryManagerEntity from '@/domain/entities/bakery-manager.entity'
import type IBakeryManagerRepository from '@/domain/interfaces/bakery-manager-repository.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { RelacaoGerenteEPadariaNaoEncontradaError } from '@/application/errors/relacao-padaria-e-gerente-nao-encontrada.error'
import { GerenteNaoEncontradoError } from '@/application/errors/gerente-nao-encontrado.error'

export default class RemoveBakeryManagerUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
    private iUserRepository: IUserRepository<UserEntity>,
  ) {}

  async execute(id: string): Promise<BakeryManagerEntity> {
    const bakeryManagerFinded =
      await this.iBakeryManagerRepository.bakeryManager({ id: id })

    if (!bakeryManagerFinded) {
      throw new RelacaoGerenteEPadariaNaoEncontradaError()
    }

    const managerFinded = await this.iUserRepository.user({
      id: bakeryManagerFinded.managerId,
    })

    if (!managerFinded) {
      throw new GerenteNaoEncontradoError()
    }

    const bakeryManagerDeleted =
      await this.iBakeryManagerRepository.deleteBakeryManager({ id })

    try {
      await this.iBakeryManagerRepository.bakeryManager({
        managerId: bakeryManagerFinded.managerId,
      })
    } catch (err) {
      await this.iUserRepository.updateUser({
        id: bakeryManagerFinded.managerId,
        role: 'USER',
      })
    }

    return bakeryManagerDeleted
  }
}
