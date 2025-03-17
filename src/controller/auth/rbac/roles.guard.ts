import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from '@prisma/client'
import { ROLES_KEY } from './roles.decorator'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!requiredRoles) {
      return true
    }

    const { role } = this.jwtService.decode(
      context
        .switchToHttp()
        .getRequest()
        .headers['authorization'].split(' ')[1],
    )

    return requiredRoles.some(requiredRoles => role.includes(requiredRoles))
  }
}
