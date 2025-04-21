import { HttpException, HttpStatus } from '@nestjs/common'

export class GerenteNaoEncontradoException extends HttpException {
  constructor() {
    super('Gerente não encontrado', HttpStatus.NOT_FOUND)
  }
}
