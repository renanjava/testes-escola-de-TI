/* eslint-disable @typescript-eslint/no-unused-vars */
import type IUseCases from '@/application/interfaces/use-cases.interface'
import type BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import type IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'
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
      throw new NotFoundException(
        'Relação entre gerente e padaria não encontrada',
      )
    }

    const managerFinded = await this.iUserRepository.user({
      id: bakeryManagerFinded.managerId,
    })

    if (!managerFinded) {
      throw new NotFoundException('Gerente não encontrado')
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
