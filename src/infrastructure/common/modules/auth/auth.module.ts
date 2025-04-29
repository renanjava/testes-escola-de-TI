import { Module } from '@nestjs/common'
import { AuthController } from '@/infrastructure/controllers/auth/auth.controller'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from '@/infrastructure/auth/jwt/jwt.strategy'
import { UserModule } from '../user/user.module'
import { JwtAuthGuard } from '@/infrastructure/auth/jwt/jwt-auth.guard'
import { EmailMessageImpl } from '@/infrastructure/email/email-message.impl'
import { AuthUseCasesFactory } from '@/infrastructure/factories/auth/auth-use-cases.factory'
import { UserRepositoryImpl } from '@/infrastructure/repositories/user/impl-user.repository'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [
    UserModule,
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    EmailMessageImpl,
    AuthUseCasesFactory,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    {
      provide: 'IEmailMessage',
      useClass: EmailMessageImpl,
    },
    { provide: 'IAccessToken', useExisting: JwtService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
