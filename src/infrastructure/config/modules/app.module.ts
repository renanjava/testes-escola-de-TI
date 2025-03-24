import { ConsoleLogger, Module } from '@nestjs/common'
import { AuthModule } from './auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user.module'
import { PrismaService } from '@/infrastructure/model/services/prisma.service'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { GlobalLoggerInterceptor } from '@/infrastructure/common/interceptors/global-logger.interceptor'
import { RolesGuard } from '@/infrastructure/auth/rbac/roles.guard'
import { GlobalExceptionFilter } from '@/infrastructure/common/filters/global-exception.filter'
import { JwtService } from '@nestjs/jwt'
import { NodemailerModule } from './nodemailer.module'
import { BakeryModule } from './bakery.module'
import { ManagerModule } from './manager.module'
import { BakeryManagerModule } from './bakery-manager.module'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    NodemailerModule,
    BakeryModule,
    ManagerModule,
    BakeryManagerModule,
  ],
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
    PrismaService,
    ConsoleLogger,
  ],
  exports: [PrismaService],
})
export class AppModule {}
