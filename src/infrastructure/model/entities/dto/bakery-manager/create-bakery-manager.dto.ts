import BakeryManagerEntity from '@/application/model/entities/bakery-manager.entity'
import { IsUUID } from 'class-validator'

export interface CreateBakeryManagerProps extends BakeryManagerEntity {
  managerId: string
  bakeryId: string
}

export class CreateBakeryManagerDto implements CreateBakeryManagerProps {
  @IsUUID()
  managerId: string

  @IsUUID()
  bakeryId: string
}
