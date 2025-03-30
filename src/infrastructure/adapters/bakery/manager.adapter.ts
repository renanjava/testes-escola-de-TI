import ManagerEntity from '@/domain/bakery/entities/manager.entity'
import { CreateManagerDto } from '@/infrastructure/dtos/bakery/create-manager.dto'
import { UpdateManagerDto } from '@/infrastructure/dtos/bakery/update-manager.dto'

export class ManagerAdapter {
  static toEntity(dto: CreateManagerDto): ManagerEntity {
    return new ManagerEntity(dto.name, dto.email, dto.password)
  }

  static toDto(entity: ManagerEntity): ManagerEntity {
    return new CreateManagerDto(entity.name, entity.email, entity.password)
  }

  static toUpdateEntity(dto: UpdateManagerDto): Partial<ManagerEntity> {
    const updateData: Partial<ManagerEntity> = {}
    if (dto.name !== undefined) updateData.name = dto.name
    if (dto.email !== undefined) updateData.email = dto.email
    if (dto.password !== undefined) updateData.password = dto.password
    return updateData
  }
}
