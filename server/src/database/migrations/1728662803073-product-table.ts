import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductTable1728662803073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS product;`);
  }
}
