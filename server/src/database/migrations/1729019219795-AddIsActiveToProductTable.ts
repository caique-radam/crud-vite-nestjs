import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToProductTable1729019219795
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Corrigido: O valor padrão não deve ter parênteses.
    await queryRunner.query(
      `ALTER TABLE product ADD is_active VARCHAR(1) NOT NULL DEFAULT 'Y'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "is_active"`);
  }
}
