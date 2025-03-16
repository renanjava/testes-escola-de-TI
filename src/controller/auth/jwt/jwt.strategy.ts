import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { UserRole } from '@prisma/client'

interface JwtPayload {
  sub: number
  username: string
  role: UserRole
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    })
  }

  validate(payload: JwtPayload): {
    userId: number
    username: string
    role: string
  } {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    }
  }
}
