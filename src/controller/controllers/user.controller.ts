import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserService } from '@/model/services/user.service'
import { UpdateUserDto } from '@/model/entities/dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id)
  }
}
