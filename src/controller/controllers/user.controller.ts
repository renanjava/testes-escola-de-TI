import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { User, UserRole } from '@prisma/client'
import { UserService } from '@/model/services/user.service'
import { UpdateUserDto } from '@/model/entities/dto/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { Roles } from '../auth/rbac/roles.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.USER)
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id)
  }
}
