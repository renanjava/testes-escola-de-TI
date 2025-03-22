import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user.repository'
import { User } from '@prisma/client'
import { UsuarioNaoEncontradoException } from '../../../shared/model/common/exceptions/usuario-nao-encontrado.exception'
import { UpdateUserDto } from '../entities/dto/user/update-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.users({})
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.user({ id })
    if (!user) {
      throw new UsuarioNaoEncontradoException()
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser({
      where: { id },
      data: updateUserDto,
    })
  }

  async remove(id: string): Promise<User> {
    return this.userRepository.deleteUser({ id })
  }
}
