import { PartialType } from '@nestjs/mapped-types'
import { CreateBakeryManagerDto } from './create-bakery-manager.dto'

export class UpdateBakeryManagerDto extends PartialType(
  CreateBakeryManagerDto,
) {}
