import ProductEntity from '@/domain/bakery/entities/product.entity'
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateProductProps implements ProductEntity {
  name: string
  description: string
  image: string[]
  price: number
  quantity: number
  disponibility: boolean
  bakeryId: string
}

export class CreateProductDto implements CreateProductProps {
  @IsString()
  name: string

  @IsString()
  description: string

  image: string[]

  @IsNumber()
  price: number

  @IsNumber()
  quantity: number

  @IsBoolean()
  disponibility: boolean

  @IsUUID()
  bakeryId: string

  constructor(
    name: string,
    description: string,
    image: string[],
    price: number,
    quantity: number,
    disponibility: boolean,
    bakeryId: string,
  ) {
    this.name = name
    this.description = description
    this.image = image
    this.price = price
    this.quantity = quantity
    this.disponibility = disponibility
    this.bakeryId = bakeryId
  }
}
