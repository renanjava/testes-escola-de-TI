import { Module } from '@nestjs/common'
import { AuthService } from '@/model/services/auth.service'
import { AuthController } from '@/controller/controllers/auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from '@/controller/auth/jwt/jwt.strategy'
import { UserModule } from '@/config/modules/user.module'
import { JwtAuthGuard } from '@/controller/auth/jwt/jwt-auth.guard'
import { NodemailerService } from '@/model/services/nodemailer.service'

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
