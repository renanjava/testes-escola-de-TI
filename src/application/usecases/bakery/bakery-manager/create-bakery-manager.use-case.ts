/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'
import type BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import type BakeryEntity from '@/domain/bakery/entities/bakery.entity'
import type IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import type IBakeryRepository from '@/domain/bakery/interfaces/bakery-repository.interface'
import type UserEntity from '@/domain/user/entities/user.entity'
import type IUserRepository from '@/domain/user/interfaces/user-repository.interface'
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
      throw new NotFoundException('Padaria não encontrada')
    }

    const managerFinded = await this.iUserRepository.user({
      id: inputBakeryManager.managerId,
    })

    if (!managerFinded) {
      throw new NotFoundException('Gerente não encontrado')
    }

    const bakeryManagerFinded =
      await this.iBakeryManagerRepository.bakeryManager({
        bakeryId: inputBakeryManager.bakeryId,
        managerId: inputBakeryManager.managerId,
      })

    if (bakeryManagerFinded) {
      throw new BadRequestException('Esta padaria já possui este gerente')
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
