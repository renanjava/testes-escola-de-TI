export class UserRoleVaziaError extends Error {
  constructor() {
    super('O atributo Role do User está vazia')
    this.name = 'UserRoleVaziaException'
  }
}
