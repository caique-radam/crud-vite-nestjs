import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createNewProduct(product: ProductDto): Promise<import("../database/entities/product.entity").ProductEntity>;
    findAllProducts(): Promise<import("../database/entities/product.entity").ProductEntity[]>;
    findProductById(id: string): Promise<import("../database/entities/product.entity").ProductEntity>;
    updateProduct(product: ProductDto): Promise<void>;
    deleteProduct(id: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
