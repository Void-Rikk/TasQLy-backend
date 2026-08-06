import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskInput } from "./dto/create-task.input";

@Injectable()
export class TaskService {

    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.task.findMany();
    }

    findOne(id: string) {
        return this.prisma.task.findUnique({ where: { id } });
    }

    create(input: CreateTaskInput) {

        return this.prisma.task.create({
            data: {
                title: input.title,
                description: input.description,
                priority: input.priority,
                tag: input.tagIds
                    ? { connect: input.tagIds.map((id) => ({ id })) }
                    : undefined,
            },
        });
    }

    async advance(id: string) {
        const task = await this.prisma.task.findUniqueOrThrow({ where: { id } });
        let newStatus: typeof task.status;

        if (task.status === "TO_DO") {
            newStatus = "IN_PROGRESS";
        }
        else if (task.status === "IN_PROGRESS") {
            newStatus = "DONE";
        }
        else {
            throw new BadRequestException("The task is already in it`s final state");
        }

        return this.prisma.task.update({
            where: { id },
            data: { status: newStatus }
        });
    }

    async delete(id: string) {
        await this.prisma.task.delete({ where: { id } });
        return true;
    }

    getTags(taskId: string) {
        return this.prisma.task
            .findUnique({ where: { id: taskId } })
            .tag();
    }
}
