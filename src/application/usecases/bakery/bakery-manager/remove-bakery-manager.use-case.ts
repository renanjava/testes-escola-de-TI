/* eslint-disable @typescript-eslint/no-unused-vars */
import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import type IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import { RelacaoEntreGerenteEPadariaNaoEncontrada } from '@/infrastructure/exceptions/bakery/bakery-manager/relacao-entre-padaria-e-gerente-nao-encontrada.exception'
import { GerenteNaoEncontradoException } from '@/infrastructure/exceptions/user/gerente-nao-encontrado.exception'
import { NotFoundException } from '@nestjs/common'

export default class RemoveBakeryManagerUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
    private iUserRepository: IUserRepository<UserEntity>,
  ) {}

  async execute(id: string): Promise<BakeryManagerEntity> {
    const bakeryManagerFinded =
      await this.iBakeryManagerRepository.bakeryManager({ id: id })

    if (!bakeryManagerFinded) {
      throw new RelacaoEntreGerenteEPadariaNaoEncontrada()
    }

    const managerFinded = await this.iUserRepository.user({
      id: bakeryManagerFinded.managerId,
    })

    if (!managerFinded) {
      throw new GerenteNaoEncontradoException()
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
