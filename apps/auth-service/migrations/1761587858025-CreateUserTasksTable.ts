import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserTasksTable1761587858025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_tasks",
                columns: [
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "task_id",
                        type: "int",
                        isNullable: false,
                    }
                ]
            })
        )
        
        await queryRunner.createForeignKeys("user_tasks", [
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            }),
            new TableForeignKey({
                columnNames: ["task_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "tasks",
                onDelete: "CASCADE"
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user_tasks")
        if (table) {
            await queryRunner.dropForeignKeys("user_tasks", table.foreignKeys)
            await queryRunner.dropColumn("user_tasks", "user_id")
            await queryRunner.dropColumn("user_tasks", "task_id")
            await queryRunner.dropTable("user_tasks")
        }
    }

}
