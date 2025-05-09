import { ConsoleLogger, Module } from '@nestjs/common'
import { AuthModule } from './auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user.module'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { GlobalLoggerInterceptor } from '@/infrastructure/common/interceptors/global-logger.interceptor'
import { RolesGuard } from '@/infrastructure/auth/roles.guard'
import { GlobalExceptionFilter } from '@/infrastructure/common/filters/global-exception.filter'
import { NodemailerModule } from './nodemailer.module'
import { BakeryModule } from './bakery.module'
import { AdminModule } from './admin.module'
import { ProductModule } from './product.module'
import { PrismaModule } from './prisma.module'
import { UserRepositoryImpl } from '@/infrastructure/repositories/impl-user.repository'
import { BakeryManagerModule } from './bakery-manager.module'
import { ManagerModule } from './manager.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    AuthModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    NodemailerModule,
    BakeryModule,
    AdminModule,
    ProductModule,
    PrismaModule,
    BakeryManagerModule,
    ManagerModule,
  ],
  providers: [
    ConsoleLogger,
    { provide: 'UserRepository', useExisting: UserRepositoryImpl },
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
  ],
})
export class AppModule {}
