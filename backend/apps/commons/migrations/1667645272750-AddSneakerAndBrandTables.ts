import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSneakerAndBrandTables1667645272750 implements MigrationInterface {
    name = 'AddSneakerAndBrandTables1667645272750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sneaker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "brand_id" uuid NOT NULL, CONSTRAINT "PK_c985314f6a7440ffd6981109884" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "sneakerId" uuid, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sneaker" ADD CONSTRAINT "FK_5712d16e95457f40000070a1263" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "FK_a11b37c3b777e8813c2c2a05a7e" FOREIGN KEY ("sneakerId") REFERENCES "sneaker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "FK_a11b37c3b777e8813c2c2a05a7e"`);
        await queryRunner.query(`ALTER TABLE "sneaker" DROP CONSTRAINT "FK_5712d16e95457f40000070a1263"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "sneaker"`);
    }

}
