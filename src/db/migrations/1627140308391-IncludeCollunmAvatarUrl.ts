/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class IncludeCollunmAvatarUrl1627140308391
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'avatar_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'avatar_url');
  }
}
