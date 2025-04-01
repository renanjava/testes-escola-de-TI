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
import { ProductService } from '../../services/bakery/product.service'
import { CreateProductDto } from '@/infrastructure/dtos/bakery/create-product.dto'
import { UpdateProductDto } from '@/infrastructure/dtos/bakery/update-product.dto'
import { ProductAdapter } from '@/infrastructure/adapters/bakery/product.adapter'
import { IUserRequest } from '../user/interfaces/user-request.interface'
import { JwtAuthGuard } from '@/infrastructure/auth/jwt/jwt-auth.guard'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: IUserRequest,
  ) {
    return this.productService.create(
      request.user.sub,
      ProductAdapter.toEntity(createProductDto),
    )
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.productService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() request: IUserRequest,
  ) {
    return this.productService.update(
      request.user.sub,
      productId,
      ProductAdapter.toUpdateEntity(updateProductDto),
    )
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') productId: string, @Req() request: IUserRequest) {
    return this.productService.remove(productId, request.user.sub)
  }
}
