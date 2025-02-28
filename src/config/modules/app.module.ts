import { ConsoleLogger, Module } from '@nestjs/common'
import { AppController } from '@/controller/controllers/app.controller'
import { AppService } from '@/model/services/app.service'
import { AuthModule } from '@/config/modules/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user.module'
import { PrismaService } from '@/model/services/prisma.service'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GlobalLoggerInterceptor } from '@/model/common/interceptors/global-logger.interceptor'

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
