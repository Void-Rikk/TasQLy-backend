import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateTagInput } from "./dto/create-tag.input";

@Injectable()
export class TagService {

    constructor(private readonly prisma: PrismaService) {}

    findAll(ownerId: string) {
        return this.prisma.tag.findMany({ where: { ownerId } });
    }

    create(input: CreateTagInput, ownerId: string) {
        return this.prisma.tag.create({
            data: {
                name: input.name,
                ownerId
            }
        });
    }

    async delete(id: string) {
        await this.prisma.tag.delete({ where: { id } });
        return true;
    }

    getTasks(tagId: string) {
        return this.prisma.tag
            .findUnique({ where: { id: tagId } })
            .Task();
    }
}
