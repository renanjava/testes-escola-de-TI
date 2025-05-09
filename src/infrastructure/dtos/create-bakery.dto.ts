import BakeryEntity from '@/domain/entities/bakery.entity'
import { IsString } from 'class-validator'

export interface CreateBakeryProps extends BakeryEntity {
  name: string
  cnpj: string
  address: string
  openTime: Date
  closeTime: Date
}

export class CreateBakeryDto implements CreateBakeryProps {
  @IsString()
  name: string

  @IsString()
  cnpj: string

  @IsString()
  address: string

  openTime: Date

  closeTime: Date

  constructor(
    name: string,
    cnpj: string,
    address: string,
    openTime: Date,
    closeTime: Date,
  ) {
    this.name = name
    this.cnpj = cnpj
    this.address = address
    this.openTime = openTime
    this.closeTime = closeTime
  }
}

export class CreateBakeryFactory {
  static create(
    name: string,
    cnpj: string,
    address: string,
    openTime: Date,
    closeTime: Date,
  ): CreateBakeryDto {
    return new CreateBakeryDto(name, cnpj, address, openTime, closeTime)
  }
}
