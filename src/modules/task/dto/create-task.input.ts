import { Field, ID, InputType } from "@nestjs/graphql";
import { IsIn, IsOptional, IsString } from "class-validator";
import { Priority } from "../../../../generated/prisma/enums";


@InputType()
export class CreateTaskInput {

    @Field()
    @IsString()
    title: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Field()
    @IsString()
    @IsIn(["HIGH", "MEDIUM", "LOW"])
    priority: Priority;

    @Field(() => [ID], { nullable: true })
    @IsOptional()
    tagIds?: string[]
}