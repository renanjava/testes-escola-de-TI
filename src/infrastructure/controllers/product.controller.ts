import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CreateProductDto } from '@/infrastructure/dtos/bakery/create-product.dto'
import { UpdateProductDto } from '@/infrastructure/dtos/bakery/update-product.dto'
import { ProductAdapter } from '@/infrastructure/adapters/product.adapter'
import { IUserRequest } from './interfaces/user-request.interface'
import { JwtAuthGuard } from '@/infrastructure/auth/jwt-auth.guard'
import { ProductUseCasesFactory } from '@/infrastructure/factories/product.use-cases.factory'
import { Product } from '@prisma/client'

@Controller('product')
export class ProductController {
  constructor(
    private readonly productUseCasesFactory: ProductUseCasesFactory,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: IUserRequest,
  ): Promise<Product> {
    const createProductUseCase =
      this.productUseCasesFactory.getCreateProductUseCaseInstance()
    return (await createProductUseCase.execute(
      request.user.sub,
      ProductAdapter.toEntity(createProductDto),
    )) as Product
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Product[]> {
    const findAllProductsUseCase =
      this.productUseCasesFactory.getFindAllProductsUseCaseInstance()
    return (await findAllProductsUseCase.execute()) as Product[]
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Product> {
    const findOneProductUseCase =
      this.productUseCasesFactory.getFindOneProductUseCaseInstance()
    return (await findOneProductUseCase.execute(id)) as Product
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() request: IUserRequest,
  ): Promise<Product> {
    const updateProductUseCase =
      this.productUseCasesFactory.getUpdateProductUseCaseInstance()
    return (await updateProductUseCase.execute(
      request.user.sub,
      productId,
      ProductAdapter.toUpdateEntity(updateProductDto),
    )) as Product
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') productId: string,
    @Req() request: IUserRequest,
  ): Promise<Product> {
    const removeProductUseCase =
      this.productUseCasesFactory.getRemoveProductUseCaseInstance()
    return (await removeProductUseCase.execute(
      request.user.sub,
      productId,
    )) as Product
  }
}
