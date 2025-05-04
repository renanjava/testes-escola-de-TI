import { HttpException, HttpStatus } from '@nestjs/common'

export class PadariaNaoEncontradaException extends HttpException {
  constructor() {
    super('Padaria não encontrada', HttpStatus.NOT_FOUND)
  }
}
