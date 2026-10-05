import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from "./models/user.model";
import { Authorization } from "../auth/decorators/authorization.decorator";
import { Authorized } from "../auth/decorators/authorized.decorator";

@Resolver(() => User)
export class UserResolver {

    constructor(private readonly userService: UserService) {}

    @Authorization()
    @Query(() => User)
    me(@Authorized('id') id: string) {
        return this.userService.findOne(id);
    }
}
