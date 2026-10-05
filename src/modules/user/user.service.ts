import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    findOne(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async create(dto: CreateUserDto) {

        const existUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (existUser) {
            throw new ConflictException("User with this email already exists");
        }

        return this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: dto.password,
            },
        });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    getTasks() {
        // ToDo
    }

    getTags() {
        // ToDo
    }
}
