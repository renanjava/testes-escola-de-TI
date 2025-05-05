/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AutenticacaoNaoEfetuadaError } from '@/application/errors/autenticacao-nao-efetuada.error'
import { EmailOuUsernameExistenteError } from '@/application/errors/email-ou-username-existente.error'
import { GerenteNaoEncontradoError } from '@/application/errors/gerente-nao-encontrado.error'
import { NenhumGerenteEncontradoError } from '@/application/errors/nenhum-gerente-encontrado.error'
import { PadariaJaPossuiEsteGerenteError } from '@/application/errors/padaria-ja-possui-este-gerente.error'
import { PadariaNaoEncontradaError } from '@/application/errors/padaria-nao-encontrada.error'
import { ProdutoNaoEncontradoError } from '@/application/errors/produto-nao-encontrado.error'
import { RelacaoGerenteEPadariaNaoEncontradaError } from '@/application/errors/relacao-padaria-e-gerente-nao-encontrada.error'
import { SenhaInvalidaError } from '@/application/errors/senha-invalida.error'
import { UserRoleVaziaError } from '@/application/errors/user-role-vazia.error'
import { UsuarioNaoEncontradoError } from '@/application/errors/usuario-nao-encontrado.error'
import { UsuarioNaoEGerenteError } from '@/application/errors/usuario-nao-gerente.error'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Erro interno no servidor'

    if (exception instanceof AutenticacaoNaoEfetuadaError) {
      status = HttpStatus.UNAUTHORIZED
      message = exception.message
    }

    if (exception instanceof EmailOuUsernameExistenteError) {
      status = HttpStatus.CONFLICT
      message = exception.message
    }

    if (exception instanceof GerenteNaoEncontradoError) {
      status = HttpStatus.BAD_REQUEST
      message = exception.message
    }

    if (exception instanceof NenhumGerenteEncontradoError) {
      status = HttpStatus.NOT_FOUND
      message = exception.message
    }

    if (exception instanceof PadariaJaPossuiEsteGerenteError) {
      status = HttpStatus.BAD_REQUEST
      message = exception.message
    }

    if (exception instanceof PadariaNaoEncontradaError) {
      status = HttpStatus.NOT_FOUND
      message = exception.message
    }

    if (exception instanceof ProdutoNaoEncontradoError) {
      status = HttpStatus.NOT_FOUND
      message = exception.message
    }

    if (exception instanceof RelacaoGerenteEPadariaNaoEncontradaError) {
      status = HttpStatus.NOT_FOUND
      message = exception.message
    }

    if (exception instanceof SenhaInvalidaError) {
      status = HttpStatus.UNAUTHORIZED
      message = exception.message
    }

    if (exception instanceof UserRoleVaziaError) {
      status = HttpStatus.UNAUTHORIZED
      message = exception.message
    }

    if (exception instanceof UsuarioNaoEncontradoError) {
      status = HttpStatus.NOT_FOUND
      message = exception.message
    }

    if (exception instanceof UsuarioNaoEGerenteError) {
      status = HttpStatus.FORBIDDEN
      message = exception.message
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      message = exception.message
    }

    const responseBody = {
      message: message,
      statusCode: status,
      timestamp: new Date(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, status)
  }
}
