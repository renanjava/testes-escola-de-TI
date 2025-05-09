export class EmailOuUsernameExistenteError extends Error {
  constructor() {
    super('Email ou Username já existe')
    this.name = 'EmailOuUsernameExistenteException'
  }
}
