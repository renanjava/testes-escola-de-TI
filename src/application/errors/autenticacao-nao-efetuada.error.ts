export class AutenticacaoNaoEfetuadaError extends Error {
  constructor() {
    super('Autenticação não efetuada')
    this.name = 'AutenticacaoNaoEfetuadaException'
  }
}
