export class RelacaoGerenteEPadariaNaoEncontradaError extends Error {
  constructor() {
    super('Relação entre gerente e padaria não encontrada')
    this.name = 'RelacaoGerenteEPadariaNaoEncontrada'
  }
}
