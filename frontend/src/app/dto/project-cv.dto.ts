import { ProjectDto } from './project.dto';

export interface ProjectCvDto {
    projectId: string;
    cvId: string;
    project: ProjectDto;
}