import { MigrationInterface, QueryRunner, Table } from "typeorm";

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
                        default: "LOW"
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: false,
                        default: "TODO"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tasks")
        if (table) {
            await queryRunner.dropTable("tasks");
        }
    }

}
