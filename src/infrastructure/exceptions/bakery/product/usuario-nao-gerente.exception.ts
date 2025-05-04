import { HttpException, HttpStatus } from '@nestjs/common'

export class UsuarioNaoEGerenteException extends HttpException {
  constructor() {
    super('O usuário não é gerente dessa padaria', HttpStatus.FORBIDDEN)
  }
}
