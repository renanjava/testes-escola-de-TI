import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { UpdateUserDto } from '@/infrastructure/dtos/user/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { IUserRequest } from './interfaces/user-request.interface'
import { UserAdapter } from '@/infrastructure/adapters/user.adapter'
import { UserUseCasesFactory } from '@/infrastructure/factories/user-use-cases.factory'

@Controller('user')
export class UserController {
  constructor(private readonly userUseCasesFactory: UserUseCasesFactory) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() request: IUserRequest): Promise<User> {
    const findOneUserUseCase =
      this.userUseCasesFactory.getFindOneUserUseCaseInstance()
    return (await findOneUserUseCase.execute(request.user.sub)) as User
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() request: IUserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updateUserUseCase =
      this.userUseCasesFactory.getUpdateUserUseCaseInstance()
    return (await updateUserUseCase.execute(
      request.user.sub,
      UserAdapter.toUpdateEntity(updateUserDto),
    )) as User
  }
}
