import ProductEntity from '@/domain/entities/product.entity'
import { CreateProductDto } from '@/infrastructure/dtos/create-product.dto'
import type { UpdateProductDto } from '@/infrastructure/dtos/update-product.dto'

export class ProductAdapter {
  static toEntity(dto: CreateProductDto): ProductEntity {
    return new ProductEntity(
      dto.name,
      dto.description,
      dto.image,
      dto.price,
      dto.quantity,
      dto.disponibility,
      dto.bakeryId,
    )
  }

  static toDto(entity: ProductEntity): CreateProductDto {
    return new CreateProductDto(
      entity.name,
      entity.description,
      entity.image,
      entity.price,
      entity.quantity,
      entity.disponibility,
      entity.bakeryId,
    )
  }

  static toUpdateEntity(dto: UpdateProductDto): Partial<ProductEntity> {
    const updateData: Partial<ProductEntity> = {}
    if (dto.description !== undefined) updateData.description = dto.description
    if (dto.name !== undefined) updateData.name = dto.name
    if (dto.price !== undefined) updateData.price = dto.price
    if (dto.image !== undefined) updateData.image = dto.image
    if (dto.quantity !== undefined) updateData.quantity = dto.quantity
    if (dto.disponibility !== undefined)
      updateData.disponibility = dto.disponibility
    if (dto.bakeryId !== undefined) updateData.bakeryId = dto.bakeryId

    return updateData
  }
}
