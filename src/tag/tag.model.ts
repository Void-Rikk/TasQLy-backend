import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Task } from "../task/task.model";


@ObjectType()
export class Tag {

    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field(() => [Task], { nullable: true })
    tasks?: Task[];
}