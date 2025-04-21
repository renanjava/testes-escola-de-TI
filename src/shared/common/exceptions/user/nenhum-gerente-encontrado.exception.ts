import { HttpException, HttpStatus } from '@nestjs/common'

export class NenhumGerenteEncontradoException extends HttpException {
  constructor() {
    super('Nenhum Gerente de Padaria encontrado', HttpStatus.NOT_FOUND)
  }
}
