import { IsString, IsEmail, IsOptional, IsUUID, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProjectEmployeeDto {
    @IsUUID()
    projectId: string;

    @IsString()
    role: string;
}

export class EmployeeDto {
    @IsUUID()
    @IsOptional()
    id?: string;

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
    @IsString()
    cv?: string;

    @IsOptional()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProjectEmployeeDto)
    projects?: ProjectEmployeeDto[];
}
