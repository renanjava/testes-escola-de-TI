import { HttpException, HttpStatus } from '@nestjs/common'

export class ProdutoNaoEncontradoException extends HttpException {
  constructor() {
    super('Produto não encontrado', HttpStatus.NOT_FOUND)
  }
}
