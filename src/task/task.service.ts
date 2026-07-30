import { Injectable } from '@nestjs/common';
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
                tag: input.tagIds
                    ? { connect: input.tagIds.map((id) => ({ id })) }
                    : undefined,
            },
        });
    }

    async toggle(id: string) {
        const task = await this.prisma.task.findUniqueOrThrow({ where: { id } });
        return this.prisma.task.update({
            where: { id },
            data: { done: !task.done }
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
