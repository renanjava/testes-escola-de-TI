import BakeryEntity from '@/domain/entities/bakery.entity'
import { CreateBakeryDto } from '@/infrastructure/dtos/create-bakery.dto'
import type { UpdateBakeryDto } from '@/infrastructure/dtos/update-bakery.dto'

export class BakeryAdapter {
  static toEntity(dto: CreateBakeryDto): BakeryEntity {
    return new BakeryEntity(
      dto.name,
      dto.cnpj,
      dto.address,
      dto.openTime,
      dto.closeTime,
    )
  }

  static toDto(entity: BakeryEntity): CreateBakeryDto {
    return new CreateBakeryDto(
      entity.name,
      entity.cnpj,
      entity.address,
      entity.openTime,
      entity.closeTime,
    )
  }

  static toUpdateEntity(dto: UpdateBakeryDto): Partial<BakeryEntity> {
    const updateData: Partial<BakeryEntity> = {}
    if (dto.name !== undefined) updateData.name = dto.name
    if (dto.cnpj !== undefined) updateData.cnpj = dto.cnpj
    if (dto.address !== undefined) updateData.address = dto.address
    if (dto.openTime !== undefined) updateData.openTime = dto.openTime
    if (dto.closeTime !== undefined) updateData.closeTime = dto.closeTime
    return updateData
  }
}
