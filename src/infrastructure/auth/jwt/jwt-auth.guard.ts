import { AutenticacaoNaoEfetuadaException } from '@/shared/model/common/exceptions/autenticacao-nao-efetuada.exception'
import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new AutenticacaoNaoEfetuadaException()
    }
    return user
  }
}
