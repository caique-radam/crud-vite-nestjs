import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../database/entities/product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(product: ProductDto): Promise<ProductEntity> {
    const newProduct = this.productRepository.create(product);
    await this.productRepository.insert(newProduct);
    return newProduct;
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findProductById(productId: string): Promise<ProductEntity> {
    return await this.productRepository.findOneBy({ id: productId });
  }

  async updateProduct(product: ProductDto) {
    await this.productRepository.update(product.id, {
      code: product.code,
      name: product.name,
    });
  }

  async deleteProduct(productId: string) {
    const productDeleted = await this.productRepository.delete({
      id: productId,
    });

    if (productDeleted.affected === 0) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      message: `Produto com ID ${productId} foi excluído com sucesso`,
    };
  }
}
