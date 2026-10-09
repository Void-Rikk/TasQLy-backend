import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskInput } from "./dto/create-task.input";
import { TaskFiltersDto } from "./dto/task-filters.dto";

@Injectable()
export class TaskService {

    constructor(private readonly prisma: PrismaService) {}

    findAll(ownerId: string, filters: TaskFiltersDto) {
        const { status, searchQuery, tagIds } = filters;

        return this.prisma.task.findMany({
            where: {
                ownerId,
                status: status,
                title: searchQuery
                    ? { contains: searchQuery, mode: 'insensitive' }
                    : undefined,
                AND: tagIds?.length
                    ? tagIds.map((id) => ({ tag: { some: { id } } }))
                    : undefined,
            },
        });
    }

    findOne(id: string) {
        return this.prisma.task.findUnique({ where: { id } });
    }

    create(input: CreateTaskInput, ownerId: string) {

        return this.prisma.task.create({
            data: {
                title: input.title,
                description: input.description,
                priority: input.priority,
                ownerId,
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
