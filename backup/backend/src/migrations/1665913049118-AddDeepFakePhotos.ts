import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeepFakePhotos1665913049118 implements MigrationInterface {
  name = "AddDeepFakePhotos1665913049118";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "deep_fake_photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "url" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_3f63368c5289a8099b7f130d79c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "deep_fake_photos" ADD CONSTRAINT "FK_5767186ad98433dd0fb6480d094" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deep_fake_photos" DROP CONSTRAINT "FK_5767186ad98433dd0fb6480d094"`
    );
    await queryRunner.query(`DROP TABLE "deep_fake_photos"`);
  }
}
