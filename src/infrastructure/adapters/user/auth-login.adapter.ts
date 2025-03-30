import UserLoginEntity from '@/domain/user/entities/user-login.entity'
import { AuthLoginDto } from '@/infrastructure/dtos/user/auth-login.dto'

export class AuthLoginAdapter {
  static toEntity(dto: AuthLoginDto): UserLoginEntity {
    return new UserLoginEntity(dto.username, dto.password)
  }

  static toDto(entity: UserLoginEntity): AuthLoginDto {
    return new AuthLoginDto(entity.password, entity.username)
  }
}
