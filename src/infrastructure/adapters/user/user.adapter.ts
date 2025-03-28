import UserEntity from '@/domain/user/entities/user.entity'
import { UpdateUserDto } from '@/infrastructure/dtos/user/update-user.dto'

export class UserAdapter {
  static toUpdateEntity(dto: UpdateUserDto): Partial<UserEntity> {
    const updateData: Partial<UserEntity> = {}
    if (dto.realname !== undefined) updateData.realname = dto.realname
    if (dto.username !== undefined) updateData.username = dto.username
    if (dto.email !== undefined) updateData.email = dto.email
    if (dto.password !== undefined) updateData.password = dto.password
    if (dto.role !== undefined) updateData.role = dto.role
    return updateData
  }
}
