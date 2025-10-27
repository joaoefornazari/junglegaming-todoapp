import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user_tasks")
        if (table) {
            await queryRunner.dropTable("user_tasks")
        }
    }

}
