import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Controller('protected')
export class AppController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedData() {
    return { message: 'Esta é uma rota protegida!' }
  }
}
