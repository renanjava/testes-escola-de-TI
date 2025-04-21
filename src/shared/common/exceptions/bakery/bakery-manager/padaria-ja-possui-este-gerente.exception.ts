import { HttpException, HttpStatus } from '@nestjs/common'

export class PadariaJaPossuiEsteGerenteException extends HttpException {
  constructor() {
    super('Esta padaria já possui este gerente', HttpStatus.BAD_REQUEST)
  }
}
