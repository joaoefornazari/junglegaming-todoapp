import { Column, MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCommentsTable1761588355161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "comments",
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
                        name: "content",
                        type: "text",
                        isNullable: false,
                    }
                ]
            })
        )

        await queryRunner.createForeignKey("comments",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("comments")
        if (table) {
            await queryRunner.dropForeignKeys("comments", table.foreignKeys)
            await queryRunner.dropColumn("comments", "user_id")
            await queryRunner.dropTable("comments")
        }
    }

}
