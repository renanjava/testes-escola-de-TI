import { PartialType } from '@nestjs/mapped-types'
import { CreateBakeryDto } from './create-bakery.dto'

export class UpdateBakeryDto extends PartialType(CreateBakeryDto) {}
