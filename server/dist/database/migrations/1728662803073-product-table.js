"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTable1728662803073 = void 0;
class ProductTable1728662803073 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`
      CREATE TABLE product (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        code VARCHAR(256) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        CONSTRAINT product_pk PRIMARY KEY (id)
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS product;`);
    }
}
exports.ProductTable1728662803073 = ProductTable1728662803073;
//# sourceMappingURL=1728662803073-product-table.js.map