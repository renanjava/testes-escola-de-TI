import { Injectable } from '@nestjs/common'
import { CreateManagerDto } from '../entities/dto/manager/create-manager.dto'
import { ManagerRepository } from '../repositories/manager.repository'

@Injectable()
export class ManagerService {
  constructor(private managerRepository: ManagerRepository) {}
  async create(createManagerDto: CreateManagerDto) {
    return await this.managerRepository.createManager({
      ...createManagerDto,
      bakeries: {
        create: createManagerDto.bakeries.map(bakeryId => ({
          bakery: { connect: { id: bakeryId } },
        })),
      },
    })
  }

  async findAll() {
    return await this.managerRepository.managers({})
  }

  async findOne(id: string) {
    return await this.managerRepository.manager({ id })
  }

  async remove(id: string) {
    return await this.managerRepository.deleteManager({ id })
  }
}
