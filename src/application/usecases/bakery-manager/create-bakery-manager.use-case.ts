/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type IUseCases from '@/application/usecases/use-cases.interface'
import type BakeryManagerEntity from '@/domain/entities/bakery-manager.entity'
import type BakeryEntity from '@/domain/entities/bakery.entity'
import type IBakeryManagerRepository from '@/domain/interfaces/bakery-manager-repository.interface'
import type IBakeryRepository from '@/domain/interfaces/bakery-repository.interface'
import type UserEntity from '@/domain/entities/user.entity'
import type IUserRepository from '@/domain/interfaces/user-repository.interface'
import { PadariaJaPossuiEsteGerenteError } from '@/application/errors/padaria-ja-possui-este-gerente.error'
import { PadariaNaoEncontradaError } from '@/application/errors/padaria-nao-encontrada.error'
import { GerenteNaoEncontradoError } from '@/application/errors/gerente-nao-encontrado.error'

export default class CreateBakeryManagerUseCase implements IUseCases {
  constructor(
    private iBakeryManagerRepository: IBakeryManagerRepository<BakeryManagerEntity>,
    private iBakeryRepository: IBakeryRepository<BakeryEntity>,
    private iUserRepository: IUserRepository<UserEntity>,
  ) {}

  async execute(
    inputBakeryManager: BakeryManagerEntity,
  ): Promise<BakeryManagerEntity> {
    const bakeryFinded = await this.iBakeryRepository.bakery({
      id: inputBakeryManager.bakeryId,
    })

    if (!bakeryFinded) {
      throw new PadariaNaoEncontradaError()
    }

    const managerFinded = await this.iUserRepository.user({
      id: inputBakeryManager.managerId,
    })

    if (!managerFinded) {
      throw new GerenteNaoEncontradoError()
    }

    const bakeryManagerFinded =
      await this.iBakeryManagerRepository.bakeryManager({
        bakeryId: inputBakeryManager.bakeryId,
        managerId: inputBakeryManager.managerId,
      })

    if (bakeryManagerFinded) {
      throw new PadariaJaPossuiEsteGerenteError()
    }

    try {
      await this.iUserRepository.updateUser({
        where: { id: inputBakeryManager.managerId, role: 'USER' },
        data: { role: 'MANAGER' },
      })
    } catch (err) {}

    return await this.iBakeryManagerRepository.createBakeryManager({
      bakery: { connect: { id: inputBakeryManager.bakeryId } },
      manager: { connect: { id: inputBakeryManager.managerId } },
    })
  }
}
