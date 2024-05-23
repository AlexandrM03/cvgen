import { IsString, IsBoolean, IsDateString, IsInt, Min, IsOptional } from 'class-validator';

export class ProjectDto {
    @IsString()
    name: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsInt()
    @Min(0)
    teamSize: number;

    @IsString()
    description: string;

    @IsString()
    responsibilities: string;

    @IsOptional()
    techStackIds?: string[];

    @IsOptional()
    roleIds?: string[];
}
