import { HttpException, HttpStatus } from '@nestjs/common'

export class AutenticacaoNaoEfetuadaException extends HttpException {
  constructor() {
    super('Autenticação não efetuada', HttpStatus.UNAUTHORIZED)
  }
}
