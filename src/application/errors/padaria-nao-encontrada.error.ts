export class PadariaNaoEncontradaError extends Error {
  constructor() {
    super('Padaria não encontrada')
    this.name = 'PadariaNaoEncontradaException'
  }
}
