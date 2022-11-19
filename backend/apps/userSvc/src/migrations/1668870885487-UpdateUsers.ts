import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1668870885487 implements MigrationInterface {
    name = 'UpdateUsers1668870885487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "activation_key" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "activation_key"`);
    }

}
