import { ConsoleLogger, Module } from '@nestjs/common'
import { AppController } from '@/controller/controllers/app.controller'
import { AppService } from '@/model/services/app.service'
import { AuthModule } from '@/config/modules/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user.module'
import { PrismaService } from '@/model/services/prisma.service'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { GlobalLoggerInterceptor } from '@/model/common/interceptors/global-logger.interceptor'
import { RolesGuard } from '@/controller/auth/rbac/roles.guard'
import { GlobalExceptionFilter } from '@/model/common/filters/global-exception.filter'
import { JwtService } from '@nestjs/jwt'
import { NodemailerModule } from './nodemailer.module'
import { BakeryModule } from './bakery.module'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    NodemailerModule,
    BakeryModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
    PrismaService,
    ConsoleLogger,
  ],
  exports: [PrismaService],
})
export class AppModule {}
