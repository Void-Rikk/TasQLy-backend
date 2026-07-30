import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Tag } from "../tag/tag.model";


@ObjectType()
export class Task {

    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    done: boolean;

    @Field(() => [Tag], { nullable: true })
    tags?: Tag[]
}