import ManagerEntity from '@/application/model/entities/manager.entity'
import { IsString } from 'class-validator'

export interface CreateManagerProps extends ManagerEntity {
  name: string
  email: string
  password: string
  bakeries: string[]
}

export class CreateManagerDto implements CreateManagerProps {
  @IsString()
  name: string

  @IsString()
  email: string

  @IsString()
  password: string

  bakeries: string[]
}
