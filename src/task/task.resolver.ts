import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from "./task.model";
import { CreateTaskInput } from "./dto/create-task.input";
import { Tag } from "../tag/tag.model";

@Resolver(() => Task)
export class TaskResolver {

    constructor(private readonly taskService: TaskService) {}

    @Query(() => [Task])
    tasks() {
        return this.taskService.findAll();
    }

    @Query(() => Task, { nullable: true })
    task(@Args('id', { type: () => ID }) id: string) {
        return this.taskService.findOne(id);
    }

    @Mutation(() => Task)
    createTask(@Args('input') input: CreateTaskInput) {
        return this.taskService.create(input);
    }

    @Mutation(() => Task)
    advanceTask(@Args('id', { type: () => ID }) id: string) {
        return this.taskService.advance(id);
    }

    @Mutation(() => Boolean)
    deleteTask(@Args('id', { type: () => ID }) id: string) {
        return this.taskService.delete(id);
    }

    @ResolveField(() => [Tag])
    tags(@Parent() task: Task) {
        return this.taskService.getTags(task.id);
    }
}
