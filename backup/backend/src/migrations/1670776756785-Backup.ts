import { MigrationInterface, QueryRunner } from "typeorm";

export class Backup1670776756785 implements MigrationInterface {
  name = "Backup1670776756785";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "decks_language_enum" AS ENUM('Abkhaz', 'Afar', 'Afrikaans', 'Akan', 'Albanian', 'Amharic', 'Arabic', 'Aragonese', 'Armenian', 'Assamese', 'Avaric', 'Avestan', 'Aymara', 'Azerbaijani', 'Bambara', 'Bashkir', 'Basque', 'Belarusian', 'Bengali', 'Bihari', 'Bislama', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Catalan/Valencian', 'Chamorro', 'Chechen', 'Chichewa/Chewa/Nyanja', 'Chinese', 'Chuvash', 'Cornish', 'Corsican', 'Cree', 'Croatian', 'Czech', 'Danish', 'Divehi/Dhivehi/Maldivian;', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Ewe', 'Faroese', 'Fijian', 'Finnish', 'French', 'Fula/Fulah/Pulaar/Pular', 'Galician', 'Georgian', 'German', 'Greek, Modern', 'Guaraní', 'Gujarati', 'Haitian/Haitian Creole', 'Hausa', 'Hebrew (modern)', 'Herero', 'Hindi', 'Hiri Motu', 'Hungarian', 'Interlingua', 'Indonesian', 'Interlingue', 'Irish', 'Igbo', 'Inupiaq', 'Ido', 'Icelandic', 'Italian', 'Inuktitut', 'Japanese', 'Javanese', 'Kalaallisut, Greenlandic', 'Kannada', 'Kanuri', 'Kashmiri', 'Kazakh', 'Khmer', 'Kikuyu, Gikuyu', 'Kinyarwanda', 'Kirghiz, Kyrgyz', 'Komi', 'Kongo', 'Korean', 'Kurdish', 'Kwanyama, Kuanyama', 'Latin', 'Luxembourgish, Letzeburgesch', 'Luganda', 'Limburgish, Limburgan, Limburger', 'Lingala', 'Lao', 'Lithuanian', 'Luba-Katanga', 'Latvian', 'Manx', 'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Māori', 'Marathi (Marāṭhī)', 'Marshallese', 'Mongolian', 'Nauru', 'Navajo, Navaho', 'Norwegian Bokmål', 'North Ndebele', 'Nepali', 'Ndonga', 'Norwegian Nynorsk', 'Norwegian', 'Nuosu', 'South Ndebele', 'Occitan', 'Ojibwe, Ojibwa', 'Old Church Slavonic/Church Slavic/Old Bulgarian', 'Oromo', 'Oriya', 'Ossetian, Ossetic', 'Panjabi/Punjabi', 'Pāli', 'Persian', 'Polish', 'Pashto/Pushto', 'Portuguese', 'Quechua', 'Romansh', 'Kirundi', 'Romanian/Moldavian/Moldovan', 'Russian', 'Sanskrit', 'Sardinian', 'Sindhi', 'Northern Sami', 'Samoan', 'Sango', 'Serbian', 'Scottish Gaelic/Gaelic', 'Shona', 'Sinhala/Sinhalese', 'Slovak', 'Slovene', 'Somali', 'Southern Sotho', 'Spanish/Castilian', 'Sundanese', 'Swahili', 'Swati', 'Swedish', 'Tamil', 'Telugu', 'Tajik', 'Thai', 'Tigrinya', 'Tibetan Standard/Tibetan, Central', 'Turkmen', 'Tagalog', 'Tswana', 'Tonga (Tonga Islands)', 'Turkish', 'Tsonga', 'Tatar', 'Twi', 'Tahitian', 'Uighur/Uyghur', 'Ukrainian', 'Urdu', 'Uzbek', 'Venda', 'Vietnamese', 'Volapük', 'Walloon', 'Welsh', 'Wolof', 'Western Frisian', 'Xhosa', 'Yiddish', 'Yoruba', 'Zhuang/Chuang')`
    );
    await queryRunner.query(
      `CREATE TABLE "decks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "name" character varying(255), "language" "decks_language_enum", CONSTRAINT "PK_981894e3f8dbe5049ac59cb1af1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deck_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "word" json, "photo" character varying(255), "audio" character varying(255), "rating" integer, "last_seen" TIMESTAMP, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "meta"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "wantsNewsletter"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_url"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_admin"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "profile_picture" character varying(255)`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "is_member" boolean`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE "decks" ADD CONSTRAINT "FK_329af7716096378c8e13125edd5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ADD CONSTRAINT "FK_48b7cc51062cec29514e72b27b9" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cards" DROP CONSTRAINT "FK_48b7cc51062cec29514e72b27b9"`
    );
    await queryRunner.query(
      `ALTER TABLE "decks" DROP CONSTRAINT "FK_329af7716096378c8e13125edd5"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT ('now'`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT ('now'`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_member"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "profile_picture"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is_admin" boolean DEFAULT false`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "avatar_url" text`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "wantsNewsletter" boolean DEFAULT false`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "meta" json`);
    await queryRunner.query(`DROP TABLE "cards"`);
    await queryRunner.query(`DROP TABLE "decks"`);
    await queryRunner.query(`DROP TYPE "decks_language_enum"`);
  }
}
