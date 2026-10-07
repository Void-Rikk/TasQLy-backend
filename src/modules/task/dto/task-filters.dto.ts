import { IsIn, IsOptional, IsString } from "class-validator";


export class TaskFiltersDto {

    @IsString()
    @IsOptional()
    @IsIn(["TO_DO", "IN_PROGRESS", "DONE"])
    status?: "TO_DO" | "IN_PROGRESS" | "DONE";
}