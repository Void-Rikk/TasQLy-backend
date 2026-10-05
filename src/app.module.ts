import { Module } from '@nestjs/common';
import { PrismaModule } from "./modules/prisma/prisma.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { TagModule } from './modules/tag/tag.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from "./modules/auth/auth.module";


@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            graphiql: true,
            context: ({ req, res }) => ({ req, res })
        }),
        PrismaModule,
        TagModule,
        TaskModule,
        UserModule,
        AuthModule
    ],
})
export class AppModule {}
