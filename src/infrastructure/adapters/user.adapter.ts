import UserEntity from '@/domain/entities/user.entity'
import type { AdminUpdateUserDto } from '@/infrastructure/dtos/admin/admin-update-user.dto'
import type { UpdateUserDto } from '@/infrastructure/dtos/user/update-user.dto'

export class UserAdapter {
  static toResponse(entity: UserEntity): UserEntity {
    return new UserEntity(
      entity.realname,
      entity.username,
      entity.email,
      undefined as any,
    )
  }
  static toUpdateEntity(dto: UpdateUserDto): Partial<UserEntity> {
    const updateData: Partial<UserEntity> = {}
    if (dto.realname !== undefined) updateData.realname = dto.realname
    if (dto.username !== undefined) updateData.username = dto.username
    if (dto.email !== undefined) updateData.email = dto.email
    if (dto.password !== undefined) updateData.password = dto.password
    return updateData
  }

  static toAdminUpdateEntity(dto: AdminUpdateUserDto): Partial<UserEntity> {
    const updateData: Partial<UserEntity> = {}
    if (dto.realname !== undefined) updateData.realname = dto.realname
    if (dto.username !== undefined) updateData.username = dto.username
    if (dto.email !== undefined) updateData.email = dto.email
    if (dto.password !== undefined) updateData.password = dto.password
    if (dto.role !== undefined) updateData.role = dto.role
    return updateData
  }
}
