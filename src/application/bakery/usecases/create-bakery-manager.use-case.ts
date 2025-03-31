import IUseCases from '@/application/interfaces/use-cases.interface'
import BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import BakeryEntity from '@/domain/bakery/entities/bakery.entity'
import IBakeryManagerRepository from '@/domain/bakery/interfaces/bakery-manager-repository.interface'
import IBakeryRepository from '@/domain/bakery/interfaces/bakery-repository.interface'
import UserEntity from '@/domain/user/entities/user.entity'
import IUserRepository from '@/domain/user/interfaces/user-repository.interface'
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
      role: 'MANAGER',
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

    return await this.iBakeryManagerRepository.createBakeryManager({
      bakery: { connect: { id: inputBakeryManager.bakeryId } },
      manager: { connect: { id: inputBakeryManager.managerId } },
    })
  }
}
