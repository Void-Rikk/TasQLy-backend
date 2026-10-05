import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Tag } from "./models/tag.model";
import { CreateTagInput } from "./dto/create-tag.input";
import { Authorization } from "../auth/decorators/authorization.decorator";
import { Authorized } from "../auth/decorators/authorized.decorator";

@Resolver(() => Tag)
export class TagResolver {

    constructor(private readonly tagService: TagService) {}

    @Authorization()
    @Query(() => [Tag])
    tags(
        @Authorized('id') ownerId: string
    ) {
        return this.tagService.findAll(ownerId);
    }

    @Authorization()
    @Mutation(() => Tag)
    createTag(
        @Args('input') input: CreateTagInput,
        @Authorized('id') ownerId: string
    ) {
        return this.tagService.create(input, ownerId);
    }

    @Authorization()
    @Mutation(() => Boolean)
    deleteTag(@Args('id', { type: () => ID }) id: string) {
        return this.tagService.delete(id);
    }

    @Authorization()
    @ResolveField()
    tasks(@Parent() tag: Tag) {
        return this.tagService.getTasks(tag.id);
    }
}
