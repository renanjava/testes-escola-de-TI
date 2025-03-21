import { IsDate, IsString } from 'class-validator'

export type CreateBakeryProps = {
  name: string
  cnpj: string
  address: string
  startedTime: Date
  endTime: Date
}

export class CreateBakeryDto {
  @IsString()
  name: string

  @IsString()
  cnpj: string

  @IsString()
  address: string

  @IsDate()
  startedTime: Date

  @IsDate()
  endTime: Date

  constructor(
    name: string,
    cnpj: string,
    address: string,
    startedTime: Date,
    endTime: Date,
  ) {
    this.name = name
    this.cnpj = cnpj
    this.address = address
    this.startedTime = startedTime
    this.endTime = endTime
  }
}

export class CreateBakeryFactory {
  static create(
    name: string,
    cnpj: string,
    address: string,
    startedTime: Date,
    endTime: Date,
  ): CreateBakeryDto {
    return new CreateBakeryDto(name, cnpj, address, startedTime, endTime)
  }
}
