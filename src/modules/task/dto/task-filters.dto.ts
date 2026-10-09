import { IsArray, IsIn, IsOptional, IsString } from "class-validator";


export class TaskFiltersDto {

    @IsOptional()
    @IsString()
    @IsIn(["TO_DO", "IN_PROGRESS", "DONE"])
    status?: "TO_DO" | "IN_PROGRESS" | "DONE";

    @IsOptional()
    @IsString()
    searchQuery?: string;

    @IsOptional()
    @IsArray()
    tagIds?: string[];
}