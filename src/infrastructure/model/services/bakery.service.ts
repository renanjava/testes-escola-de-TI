import { Injectable } from '@nestjs/common'
import { CreateBakeryDto } from '../entities/dto/bakery/create-bakery.dto'
import { UpdateBakeryDto } from '../entities/dto/bakery/update-bakery.dto'
import { BakeryRepository } from '../repositories/bakery.repository'

@Injectable()
export class BakeryService {
  constructor(private readonly bakeryRepository: BakeryRepository) {}
  async create(createBakeryDto: CreateBakeryDto) {
    return await this.bakeryRepository.bakery(createBakeryDto)
  }

  async findAll() {
    return await this.bakeryRepository.bakeries({})
  }

  async findOne(id: string) {
    return await this.bakeryRepository.bakery({ id })
  }

  async update(id: string, updateBakeryDto: UpdateBakeryDto) {
    return await this.bakeryRepository.updateBakery({
      where: { id },
      data: updateBakeryDto,
    })
  }

  async remove(id: string) {
    return await this.bakeryRepository.deleteBakery({ id })
  }
}
