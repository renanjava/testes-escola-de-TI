import BakeryEntity from '@/application/model/entities/bakery.entity'
import { IsDate, IsString } from 'class-validator'

export interface CreateBakeryProps extends BakeryEntity {
  name: string
  cnpj: string
  address: string
  openTime: Date
  closeTime: Date
  managers: string[]
}

export class CreateBakeryDto implements CreateBakeryProps {
  @IsString()
  name: string

  @IsString()
  cnpj: string

  @IsString()
  address: string

  @IsDate()
  openTime: Date

  @IsDate()
  closeTime: Date

  managers: string[]

  constructor(
    name: string,
    cnpj: string,
    address: string,
    openTime: Date,
    closeTime: Date,
    managers: string[],
  ) {
    this.name = name
    this.cnpj = cnpj
    this.address = address
    this.openTime = openTime
    this.closeTime = closeTime
    this.managers = managers
  }
}

export class CreateBakeryFactory {
  static create(
    name: string,
    cnpj: string,
    address: string,
    openTime: Date,
    closeTime: Date,
    managers: string[],
  ): CreateBakeryDto {
    return new CreateBakeryDto(
      name,
      cnpj,
      address,
      openTime,
      closeTime,
      managers,
    )
  }
}
