import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from '@prisma/client'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )
    console.log('User role:')
    console.log('Required roles:', requiredRoles)

    const { user } = context.switchToHttp().getRequest()
    console.log('User role:', user.role)
    console.log('Required roles:', requiredRoles)
    return requiredRoles.includes(user.role)
  }
}
