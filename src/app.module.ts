import { ConsoleLogger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { PrismaService } from '../prisma/prisma.service'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GlobalLoggerInterceptor } from './common/interceptors/global-logger.interceptor'

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggerInterceptor,
    },
    AppService,
    PrismaService,
    ConsoleLogger,
  ],
  exports: [PrismaService],
})
export class AppModule {}
