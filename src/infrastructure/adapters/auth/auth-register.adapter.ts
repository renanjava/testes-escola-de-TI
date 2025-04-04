import UserEntity from '@/domain/user/entities/user.entity'
import type { AuthRegisterProps } from '@/infrastructure/dtos/auth/auth-register.dto'
import { AuthRegisterDto } from '@/infrastructure/dtos/auth/auth-register.dto'

export class AuthRegisterAdapter {
  static toEntity(dto: AuthRegisterDto): UserEntity {
    return new UserEntity(dto.realname, dto.username, dto.email, dto.password)
  }

  static toResponse(entity: UserEntity): AuthRegisterProps {
    return new AuthRegisterDto(
      entity.realname,
      entity.username,
      entity.email,
      undefined as any,
    )
  }
}
