import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createNewProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Get()
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return this.productService.findProductById(id);
  }

  @Put()
  updateProduct(@Body() product: ProductDto) {
    return this.productService.updateProduct(product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
