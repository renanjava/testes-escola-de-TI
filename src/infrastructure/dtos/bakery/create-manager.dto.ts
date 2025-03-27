import ManagerEntity from '@/domain/bakery/entities/manager.entity'
import { IsString } from 'class-validator'

export interface CreateManagerProps extends ManagerEntity {
  name: string
  email: string
  password: string
}

export class CreateManagerDto implements CreateManagerProps {
  @IsString()
  name: string

  @IsString()
  email: string

  @IsString()
  password: string

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }
}

export class CreateManagerFactory {
  static create(
    name: string,
    email: string,
    password: string,
  ): CreateManagerDto {
    return new CreateManagerDto(name, email, password)
  }
}
