import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTasksTable1761586277939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_author_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "deadline",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "priority",
                        type: "varchar",
                        isNullable: false,
                        default: "'LOW'"
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: false,
                        default: "'TODO'"
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                columnNames: ["user_author_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tasks")
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_author_id") !== -1)
            if (foreignKey) {
                await queryRunner.dropForeignKey("tasks", foreignKey)
            }
            await queryRunner.dropColumn("tasks", "user_author_id")
            await queryRunner.dropTable("tasks")
        }
    }

}
