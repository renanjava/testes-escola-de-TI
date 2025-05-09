export class ProdutoNaoEncontradoError extends Error {
  constructor() {
    super('Produto não encontrado')
    this.name = 'ProdutoNaoEncontradoException'
  }
}
