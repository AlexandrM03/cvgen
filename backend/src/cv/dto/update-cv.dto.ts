import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateCvDto {
    @IsString()
    name: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    specialization: string;

    @IsString()
    department: string;

    @IsOptional()
    skills: Array<{ skillId: string; level: number }>;

    @IsOptional()
    languages: Array<{ languageId: string; level: string }>;

    @IsOptional()
    projects: Array<{ projectId: string }>;
}
