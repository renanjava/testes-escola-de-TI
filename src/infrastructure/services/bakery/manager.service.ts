import { Injectable } from '@nestjs/common'
import { CreateManagerDto } from '@/infrastructure/dtos/bakery/create-manager.dto'
import { ManagerRepository } from '@/infrastructure/repositories/bakery/manager.repository'

@Injectable()
export class ManagerService {
  constructor(private managerRepository: ManagerRepository) {}
  async create(createManagerDto: CreateManagerDto) {
    return await this.managerRepository.createManager(createManagerDto)
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
