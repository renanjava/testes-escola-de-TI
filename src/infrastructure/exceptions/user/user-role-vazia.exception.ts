import { HttpException, HttpStatus } from '@nestjs/common'

export class UserRoleVaziaException extends HttpException {
  constructor() {
    super('O atributo Role do User está vazia', HttpStatus.UNAUTHORIZED)
  }
}
