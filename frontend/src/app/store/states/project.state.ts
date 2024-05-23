import { ProjectDto } from '../../dto/project.dto';

export interface ProjectState {
    projects: ProjectDto[];
    project: ProjectDto;
}

export const projectInitialState: ProjectState = {
    projects: [],
    project: null
};