import { AutenticacaoNaoEfetuadaError } from '@/application/errors/autenticacao-nao-efetuada.error'
import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new AutenticacaoNaoEfetuadaError()
    }
    return user
  }
}
