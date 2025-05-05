export class UsuarioNaoEGerenteError extends Error {
  constructor() {
    super('O usuário não é gerente dessa padaria')
    this.name = 'UsuarioNaoEGerenteException'
  }
}
