import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateTagInput } from "./dto/create-tag.input";

@Injectable()
export class TagService {

    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.tag.findMany();
    }

    create(input: CreateTagInput) {
        return this.prisma.tag.create({ data: { name: input.name } });
    }

    getTasks(tagId: string) {
        return this.prisma.tag
            .findUnique({ where: { id: tagId } })
            .Task();
    }
}
