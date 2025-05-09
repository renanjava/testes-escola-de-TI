export class NenhumGerenteEncontradoError extends Error {
  constructor() {
    super('Nenhum Gerente de Padaria encontrado')
    this.name = 'NenhumGerenteEncontradoException'
  }
}
