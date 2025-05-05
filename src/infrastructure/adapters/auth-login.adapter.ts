import UserLoginEntity from '@/application/dtos/user-login.input'
import { AuthLoginDto } from '@/infrastructure/dtos/auth-login.dto'

export class AuthLoginAdapter {
  static toEntity(dto: AuthLoginDto): UserLoginEntity {
    return new UserLoginEntity(dto.username, dto.password)
  }

  static toDto(entity: UserLoginEntity): AuthLoginDto {
    return new AuthLoginDto(entity.password, entity.username)
  }
}
