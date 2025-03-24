import { Injectable } from '@nestjs/common'
import { CreateBakeryManagerDto } from '@/infrastructure/model/entities/dto/bakery-manager/create-bakery-manager.dto'
import { UpdateBakeryManagerDto } from '@/infrastructure/model/entities/dto/bakery-manager/update-bakery-manager.dto'
import { BakeryManagerRepository } from '../repositories/bakery-manager.repository'

@Injectable()
export class BakeryManagerService {
  constructor(private bakeryManagerRepository: BakeryManagerRepository) {}
  async create(createBakeryManagerDto: CreateBakeryManagerDto) {
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

  async update(id: string, updateBakeryManagerDto: UpdateBakeryManagerDto) {
    return await this.bakeryManagerRepository.updateBakeryManager({
      where: { id },
      data: {
        bakery: { connect: { id: updateBakeryManagerDto.bakeryId } },
        manager: { connect: { id: updateBakeryManagerDto.managerId } },
      },
    })
  }

  async remove(id: string) {
    return await this.bakeryManagerRepository.deleteBakeryManager({ id })
  }
}
