/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import type BakeryEntity from '@/domain/bakery/entities/bakery.entity'
import type IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import type IBakeryRepository from '@/domain/bakery/interfaces/bakery-repository.interface'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'
import { PadariaJaPossuiEsteGerenteException } from '@/shared/common/exceptions/bakery/bakery-manager/padaria-ja-possui-este-gerente.exception'
import { PadariaNaoEncontradaException } from '@/shared/common/exceptions/bakery/padaria-nao-encontrada.exception'
import { GerenteNaoEncontradaException } from '@/shared/common/exceptions/user/gerente-nao-encontrado.exception'
import { BadRequestException, NotFoundException } from '@nestjs/common'

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
      throw new PadariaNaoEncontradaException()
    }

    const managerFinded = await this.iUserRepository.user({
      id: inputBakeryManager.managerId,
    })

    if (!managerFinded) {
      throw new GerenteNaoEncontradaException()
    }

    const bakeryManagerFinded =
      await this.iBakeryManagerRepository.bakeryManager({
        bakeryId: inputBakeryManager.bakeryId,
        managerId: inputBakeryManager.managerId,
      })

    if (bakeryManagerFinded) {
      throw new PadariaJaPossuiEsteGerenteException()
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
