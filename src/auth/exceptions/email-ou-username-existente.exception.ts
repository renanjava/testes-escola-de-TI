import { HttpException, HttpStatus } from '@nestjs/common'

export class EmailOuUsernameExistenteException extends HttpException {
  constructor() {
    super('Email ou Username já existe', HttpStatus.BAD_REQUEST)
  }
}
