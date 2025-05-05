import UserLoginEntity from '@/domain/entities/user-login.entity'
import { AuthLoginDto } from '@/infrastructure/dtos/auth/auth-login.dto'

export class AuthLoginAdapter {
  static toEntity(dto: AuthLoginDto): UserLoginEntity {
    return new UserLoginEntity(dto.username, dto.password)
  }

  static toDto(entity: UserLoginEntity): AuthLoginDto {
    return new AuthLoginDto(entity.password, entity.username)
  }
}
