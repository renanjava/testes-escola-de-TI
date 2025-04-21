import { HttpException, HttpStatus } from '@nestjs/common'

export class RelacaoEntreGerenteEPadariaNaoEncontrada extends HttpException {
  constructor() {
    super(
      'Relação entre gerente e padaria não encontrada',
      HttpStatus.NOT_FOUND,
    )
  }
}
