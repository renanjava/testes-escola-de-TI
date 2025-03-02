import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { catchError, Observable, tap } from 'rxjs'

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private nativeLogger: ConsoleLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp()
    const request = httpContext.getRequest<Request>()
    const response = httpContext.getResponse<Response>()

    const { url, method } = request

    function retornaLog(nativeLogger: ConsoleLogger) {
      response.on('finish', () => {
        const { statusCode } = response
        nativeLogger.log(`${method} ${url} ${statusCode}`)
      })
    }

    return next.handle().pipe(
      tap(() => {
        retornaLog(this.nativeLogger)
      }),
      catchError(err => {
        retornaLog(this.nativeLogger)
        throw err
      }),
    )
  }
}
