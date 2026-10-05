import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Task } from "../../task/models/task.model";


@ObjectType()
export class Tag {

    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field(() => ID)
    ownerId: string;

    @Field(() => [Task], { nullable: true })
    tasks?: Task[];
}