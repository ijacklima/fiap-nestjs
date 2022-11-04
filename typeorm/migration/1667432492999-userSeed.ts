import { MigrationInterface, QueryRunner } from 'typeorm';

export class userSeed1667432492999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (name, email, password) VALUES ('Jack Lima', 'ijackvas@gmail.com', '123456')`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE email = 'ijackvas@gmail.com'`,
    );
  }
}
