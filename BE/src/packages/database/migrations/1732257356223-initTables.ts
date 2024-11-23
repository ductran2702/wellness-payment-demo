import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTables1732257356223 implements MigrationInterface {
    name = 'InitTables1732257356223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "main"."users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."orders" ("id" SERIAL NOT NULL, "total" numeric(15,2) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "description" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main"."order_items" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "order_id" integer NOT NULL, "product_id" integer, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "main"."order_items" ADD CONSTRAINT "Order_ID_PK" FOREIGN KEY ("order_id") REFERENCES "main"."orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main"."order_items" ADD CONSTRAINT "Product_ID_PK" FOREIGN KEY ("product_id") REFERENCES "main"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "main"."order_items" DROP CONSTRAINT "Product_ID_PK"`);
        await queryRunner.query(`ALTER TABLE "main"."order_items" DROP CONSTRAINT "Order_ID_PK"`);
        await queryRunner.query(`DROP TABLE "main"."order_items"`);
        await queryRunner.query(`DROP TABLE "main"."products"`);
        await queryRunner.query(`DROP TABLE "main"."orders"`);
        await queryRunner.query(`DROP TABLE "main"."users"`);
    }

}
