import { ConsoleLogger, Module } from '@nestjs/common'
import { AuthModule } from './user/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { PrismaService } from '@/infrastructure/services/orm/prisma.service'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { GlobalLoggerInterceptor } from '@/infrastructure/common/interceptors/global-logger.interceptor'
import { RolesGuard } from '@/infrastructure/auth/rbac/roles.guard'
import { GlobalExceptionFilter } from '@/infrastructure/common/filters/global-exception.filter'
import { JwtService } from '@nestjs/jwt'
import { NodemailerModule } from './email/nodemailer.module'
import { BakeryModule } from './bakery/bakery.module'
import { ManagerService } from '@/infrastructure/services/user/manager.service'
import { AdminModule } from './user/admin.module'
import { ProductModule } from './bakery/product.module'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    NodemailerModule,
    BakeryModule,
    AdminModule,
    ProductModule,
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
    ManagerService,
  ],
  exports: [PrismaService],
})
export class AppModule {}
