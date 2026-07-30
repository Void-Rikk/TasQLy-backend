import { Field, ID, InputType } from "@nestjs/graphql";


@InputType()
export class CreateTaskInput {

    @Field()
    title: string;

    @Field(() => [ID], { nullable: true })
    tagIds?: string[]
}