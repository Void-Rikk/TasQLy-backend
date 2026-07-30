import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Tag } from "./tag.model";
import { CreateTagInput } from "./dto/create-tag.input";

@Resolver(() => Tag)
export class TagResolver {

    constructor(private readonly tagService: TagService) {}

    @Query(() => [Tag])
    tags() {
        return this.tagService.findAll();
    }

    @Mutation(() => Tag)
    createTag(@Args('input') input: CreateTagInput) {
        return this.tagService.create(input);
    }

    @ResolveField()
    tasks(@Parent() tag: Tag) {
        return this.tagService.getTasks(tag.id);
    }
}
