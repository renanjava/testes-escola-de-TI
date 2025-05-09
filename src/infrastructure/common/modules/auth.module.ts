import { Module } from '@nestjs/common'
import { AuthController } from '@/infrastructure/controllers/auth.controller'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from '@/infrastructure/auth/jwt.strategy'
import { UserModule } from './user.module'
import { JwtAuthGuard } from '@/infrastructure/auth/jwt-auth.guard'
import { EmailMessageImpl } from '@/infrastructure/email/email-message.impl'
import { AuthUseCasesFactory } from '@/infrastructure/factories/auth-use-cases.factory'
import { UserRepositoryImpl } from '@/infrastructure/repositories/impl-user.repository'
import { PrismaModule } from './prisma.module'
import { NodemailerModule } from './nodemailer.module'

@Module({
  imports: [
    UserModule,
    PrismaModule,
    ConfigModule,
    NodemailerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    AuthUseCasesFactory,
    { provide: 'UserRepository', useExisting: UserRepositoryImpl },
    {
      provide: 'EmailMessage',
      useExisting: EmailMessageImpl,
    },
    { provide: 'AccessToken', useExisting: JwtService },
  ],
})
export class AuthModule {}
