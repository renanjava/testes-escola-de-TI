import UserEntity from '@/domain/entities/user.entity'
import type { AuthRegisterProps } from '@/application/dtos/interfaces/auth-register.props'
import { AuthRegisterDto } from '@/infrastructure/dtos/auth-register.dto'

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
