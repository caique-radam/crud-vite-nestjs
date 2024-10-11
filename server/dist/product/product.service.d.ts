import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from '../database/entities/product.entity';
import { ProductDto } from './dto/product.dto';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    createProduct(product: ProductDto): Promise<ProductEntity>;
    findAllProducts(): Promise<ProductEntity[]>;
    findProductById(productId: string): Promise<ProductEntity>;
    updateProduct(product: ProductDto): Promise<void>;
    deleteProduct(productId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
