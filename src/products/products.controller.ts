import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { get } from 'http';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  async createProduct(@Body() req: CreateProductDTO): Promise<string> {
    return this.productsService.createProduct(req);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() req: UpdateProductDTO) {
    return this.productsService.update(id, req);
  }
}
