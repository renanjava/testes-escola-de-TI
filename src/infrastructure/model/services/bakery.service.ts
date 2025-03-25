import { Injectable } from '@nestjs/common'
import { CreateBakeryDto } from '../entities/dto/bakery/create-bakery.dto'
import { BakeryRepository } from '../repositories/bakery.repository'

@Injectable()
export class BakeryService {
  constructor(private readonly bakeryRepository: BakeryRepository) {}
  async create(createBakeryDto: CreateBakeryDto) {
    return await this.bakeryRepository.createBakery(createBakeryDto)
  }

  async findAll() {
    return await this.bakeryRepository.bakeries({})
  }

  async findOne(id: string) {
    return await this.bakeryRepository.bakery({ id })
  }

  async remove(id: string) {
    return await this.bakeryRepository.deleteBakery({ id })
  }
}
