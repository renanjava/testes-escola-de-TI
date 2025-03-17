import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common'
import { User, UserRole } from '@prisma/client'
import { UserService } from '@/model/services/user.service'
import { UpdateUserDto } from '@/model/entities/dto/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'
import { Roles } from '../auth/rbac/roles.decorator'
import { IUserRequest } from '../payloads/user-request.interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() request: IUserRequest): Promise<User> {
    return await this.userService.findOne(request.user.sub)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() request: IUserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(request.user.sub, updateUserDto)
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id)
  }
}
