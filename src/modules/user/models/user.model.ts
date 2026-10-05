import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class User {

    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    password: string;

    // ToDo
    // @Field(() => [Task], { nullable: true })
    // tasks?: Task[];
    //
    // @Field(() => [Tag], { nullable: true })
    // tags?: Tag[];
}