import BakeryManagerEntity from '@/domain/bakery/entities/bakery-manager.entity'
import { CreateBakeryManagerDto } from '@/infrastructure/dtos/bakery/create-bakery-manager.dto'

export class BakeryManagerAdapter {
  static toEntity(dto: CreateBakeryManagerDto): BakeryManagerEntity {
    return new BakeryManagerEntity(dto.managerId, dto.bakeryId)
  }

  static toDto(entity: BakeryManagerEntity): CreateBakeryManagerDto {
    return new CreateBakeryManagerDto(entity.managerId, entity.bakeryId)
  }
}
