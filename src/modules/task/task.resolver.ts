import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from "./models/task.model";
import { CreateTaskInput } from "./dto/create-task.input";
import { Tag } from "../tag/models/tag.model";
import { Authorization } from "../auth/decorators/authorization.decorator";
import { Authorized } from "../auth/decorators/authorized.decorator";

@Resolver(() => Task)
export class TaskResolver {

    constructor(private readonly taskService: TaskService) {}

    @Authorization()
    @Query(() => [Task])
    tasks(
        @Authorized("id") ownerId: string,
    ) {
        return this.taskService.findAll(ownerId);
    }

    @Authorization()
    @Query(() => Task, { nullable: true })
    task(@Args('id', { type: () => ID }) id: string) {
        return this.taskService.findOne(id);
    }

    @Authorization()
    @Mutation(() => Task)
    createTask(
        @Args('input') input: CreateTaskInput,
        @Authorized('id') ownerId: string
    ) {
        return this.taskService.create(input, ownerId);
    }

    @Authorization()
    @Mutation(() => Task)
    advanceTask(@Args('id', { type: () => ID }) id: string) {
        return this.taskService.advance(id);
    }

    @Authorization()
    @Mutation(() => Boolean)
    deleteTask(@Args('id', { type: () => ID }) id: string) {
        return this.taskService.delete(id);
    }

    @Authorization()
    @ResolveField(() => [Tag])
    tags(@Parent() task: Task) {
        return this.taskService.getTags(task.id);
    }
}
