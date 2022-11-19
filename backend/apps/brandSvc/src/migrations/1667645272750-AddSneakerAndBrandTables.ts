import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSneakerAndBrandTables1667645272750
  implements MigrationInterface
{
  name = 'AddSneakerAndBrandTables1667645272750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "sneakerId" uuid, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_a11b37c3b777e8813c2c2a05a7e" FOREIGN KEY ("sneakerId") REFERENCES "sneaker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_a11b37c3b777e8813c2c2a05a7e"`,
    );
    await queryRunner.query(`DROP TABLE "brand"`);
  }
}
