export class PadariaJaPossuiEsteGerenteError extends Error {
  constructor() {
    super('Esta padaria já possui este gerente')
    this.name = 'PadariaJaPossuiEsteGerenteException'
  }
}
