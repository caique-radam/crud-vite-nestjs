"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../database/entities/product.entity");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async createProduct(product) {
        const newProduct = this.productRepository.create(product);
        await this.productRepository.insert(newProduct);
        return newProduct;
    }
    async findAllProducts() {
        return await this.productRepository.find();
    }
    async findProductById(productId) {
        return await this.productRepository.findOneBy({ id: productId });
    }
    async updateProduct(product) {
        await this.productRepository.update(product.id, {
            code: product.code,
            name: product.name,
        });
    }
    async deleteProduct(productId) {
        const productDeleted = await this.productRepository.delete({
            id: productId,
        });
        if (productDeleted.affected === 0) {
            throw new common_1.HttpException('Produto não encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: `Produto com ID ${productId} foi excluído com sucesso`,
        };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map