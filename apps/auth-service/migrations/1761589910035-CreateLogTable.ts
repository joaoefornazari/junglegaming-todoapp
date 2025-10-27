import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLogTable1761589910035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "logs",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "object_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "object_action",
                        type: "varchar",
                        isNullable: false,
                        default: "EDITED"
                    },
                    {
                        name: "object_type",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "content_before",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "content_after",
                        type: "text",
                        isNullable: true,
                    }
                ]
            })
        )

        await queryRunner.createForeignKeys("logs",
            [
                new TableForeignKey({
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                }),
            ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("logs")
        if (table) {
            await queryRunner.dropForeignKeys("logs", table.foreignKeys)
            await queryRunner.dropColumn("logs", "user_id")
            await queryRunner.dropTable("logs")
        }
    }

}
