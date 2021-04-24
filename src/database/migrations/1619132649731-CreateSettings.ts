import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1619132649731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'settings',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: '(uuid())'
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'chat',
                        type: 'boolean',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('settings');
    }

}
