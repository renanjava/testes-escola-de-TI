import { ConsoleLogger, Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { GlobalLoggerInterceptor } from '@/infrastructure/common/interceptors/global-logger.interceptor'
import { RolesGuard } from '@/infrastructure/auth/rbac/roles.guard'
import { GlobalExceptionFilter } from '@/infrastructure/common/filters/global-exception.filter'
import { JwtService } from '@nestjs/jwt'
import { NodemailerModule } from './email/nodemailer.module'
import { BakeryModule } from './bakery/bakery.module'
import { AdminModule } from './user/admin.module'
import { ProductModule } from './bakery/product/product.module'
import { PrismaModule } from './prisma/prisma.module'
import { ManagerUseCasesFactory } from '@/infrastructure/factories/user/manager-use-cases.factory'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    UserModule,
    NodemailerModule,
    BakeryModule,
    AdminModule,
    ProductModule,
    PrismaModule,
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
    ConsoleLogger,
    ManagerUseCasesFactory,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
  ],
})
export class AppModule {}
