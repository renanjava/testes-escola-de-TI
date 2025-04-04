import { Module } from '@nestjs/common'
import { AuthService } from '@/infrastructure/services/auth/auth.service'
import { AuthController } from '@/infrastructure/controllers/auth/auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from '@/infrastructure/auth/jwt/jwt.strategy'
import { UserModule } from '../user/user.module'
import { JwtAuthGuard } from '@/infrastructure/auth/jwt/jwt-auth.guard'
import { NodemailerService } from '@/infrastructure/services/email/nodemailer.service'

@Module({
  imports: [
    UserModule,
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
  providers: [AuthService, JwtStrategy, JwtAuthGuard, NodemailerService],
  controllers: [AuthController],
})
export class AuthModule {}
