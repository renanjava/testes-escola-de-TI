/* eslint-disable @typescript-eslint/unbound-method */
import { GlobalExceptionFilter } from '../../global-exception.filter'
import type { HttpAdapterHost } from '@nestjs/core'
import type { ArgumentsHost } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common'

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter
  let httpAdapterHost: HttpAdapterHost

  beforeEach(() => {
    httpAdapterHost = {
      httpAdapter: { reply: jest.fn(), getRequestUrl: jest.fn() },
    } as any
    filter = new GlobalExceptionFilter(httpAdapterHost)
  })

  it('should handle unknown exception', () => {
    const timestamp = new Date()
    const exception = new Error('Erro interno no servidor')

    const host = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue({}),
        getRequest: jest.fn().mockReturnValue({}),
      }),
    } as unknown as ArgumentsHost

    filter.catch(exception, host)

    expect(httpAdapterHost.httpAdapter.reply).toHaveBeenCalledWith(
      {},
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: timestamp,
        path: undefined,
        message: 'Erro interno no servidor',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
  })
})
