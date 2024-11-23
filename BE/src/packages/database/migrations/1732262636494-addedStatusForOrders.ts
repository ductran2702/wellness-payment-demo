import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddedStatusForOrders1732262636494 implements MigrationInterface {
  name = 'AddedStatusForOrders1732262636494'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "main"."orders_status_enum" AS ENUM('pending', 'confirmed', 'cancelled')`)
    await queryRunner.query(
      `ALTER TABLE "main"."orders" ADD "status" "main"."orders_status_enum" NOT NULL DEFAULT 'pending'`,
    )
    await queryRunner.query(`
            ALTER SEQUENCE "main"."orders_id_seq" RESTART WITH 5000;
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "main"."orders" DROP COLUMN "status"`)
    await queryRunner.query(`DROP TYPE "main"."orders_status_enum"`)
    await queryRunner.query(`
            ALTER SEQUENCE "main"."orders_id_seq" RESTART WITH 1;
          `)
  }
}
