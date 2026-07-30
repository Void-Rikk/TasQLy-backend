import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from "./prisma/prisma.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { TagModule } from './tag/tag.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
        PrismaModule,
        TagModule,
        TaskModule
    ],
    providers: [AppService],
})
export class AppModule {}
