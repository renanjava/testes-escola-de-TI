import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateBakeryManagerDto } from '@/infrastructure/model/entities/dto/bakery-manager/create-bakery-manager.dto'
import { BakeryManagerRepository } from '../repositories/bakery-manager.repository'
import { BakeryRepository } from '../repositories/bakery.repository'
import { ManagerRepository } from '../repositories/manager.repository'

@Injectable()
export class BakeryManagerService {
  constructor(
    private bakeryManagerRepository: BakeryManagerRepository,
    private bakeryRepository: BakeryRepository,
    private managerRepository: ManagerRepository,
  ) {}
  async create(createBakeryManagerDto: CreateBakeryManagerDto) {
    const bakeryFinded = await this.bakeryRepository.bakery({
      id: createBakeryManagerDto.bakeryId,
    })

    if (!bakeryFinded) {
      throw new NotFoundException('Padaria não encontrada')
    }

    const managerFinded = await this.managerRepository.manager({
      id: createBakeryManagerDto.managerId,
    })

    if (!managerFinded) {
      throw new NotFoundException('Gerente não encontrado')
    }

    const bakeryManagerFinded =
      await this.bakeryManagerRepository.bakeryManager({
        bakeryId: createBakeryManagerDto.bakeryId,
        managerId: createBakeryManagerDto.managerId,
      })

    if (bakeryManagerFinded) {
      throw new BadRequestException('Esta padaria já possui este gerente')
    }

    return await this.bakeryManagerRepository.createBakeryManager({
      bakery: { connect: { id: createBakeryManagerDto.bakeryId } },
      manager: { connect: { id: createBakeryManagerDto.managerId } },
    })
  }

  async findAll() {
    return await this.bakeryManagerRepository.bakeryManagers({})
  }

  async findOne(id: string) {
    return await this.bakeryManagerRepository.bakeryManager({ id })
  }

  async remove(id: string) {
    const bakeryManagerFinded =
      await this.bakeryManagerRepository.bakeryManager({ id: id })

    if (!bakeryManagerFinded) {
      throw new NotFoundException(
        'Relação entre gerente e padaria não encontrada',
      )
    }
    return await this.bakeryManagerRepository.deleteBakeryManager({ id })
  }
}
