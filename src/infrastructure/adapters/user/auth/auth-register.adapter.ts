import UserEntity from '@/domain/user/entities/user.entity'
import { AuthRegisterDto } from '@/infrastructure/dtos/auth/auth-register.dto'

export class AuthRegisterAdapter {
  static toEntity(dto: AuthRegisterDto): UserEntity {
    return new UserEntity(dto.realname, dto.username, dto.email, dto.password)
  }

  static toDto(entity: UserEntity): AuthRegisterDto {
    return new AuthRegisterDto(
      entity.realname,
      entity.username,
      entity.email,
      entity.password,
    )
  }
}
