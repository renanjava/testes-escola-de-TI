export class GerenteNaoEncontradoError extends Error {
  constructor() {
    super('Gerente não encontrado')
    this.name = 'GerenteNaoEncontradoException'
  }
}
