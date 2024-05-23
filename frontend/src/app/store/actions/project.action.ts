import { createAction, props } from '@ngrx/store';
import { ProjectDto } from '../../dto/project.dto';

export enum ProjectActionsEnum {
    GET_PROJECTS = '[Project] Get Projects',
    GET_PROJECTS_SUCCESS = '[Project] Get Projects Success',
    CREATE_PROJECT = '[Project] Create Project',
    CREATE_PROJECT_SUCCESS = '[Project] Create Project Success',
    GET_PROJECT = '[Project] Get Project',
    GET_PROJECT_SUCCESS = '[Project] Get Project Success',
    UPDATE_PROJECT = '[Project] Update Project',
    UPDATE_PROJECT_SUCCESS = '[Project] Update Project Success',
}

export const getProjects = createAction(ProjectActionsEnum.GET_PROJECTS);

export const getProjectsSuccess = createAction(
    ProjectActionsEnum.GET_PROJECTS_SUCCESS,
    props<{ projects: ProjectDto[] }>()
);

export const createProject = createAction(
    ProjectActionsEnum.CREATE_PROJECT,
    props<{ project: ProjectDto }>()
);

export const createProjectSuccess = createAction(
    ProjectActionsEnum.CREATE_PROJECT_SUCCESS,
    props<{ project: ProjectDto }>()
);

export const getProject = createAction(
    ProjectActionsEnum.GET_PROJECT,
    props<{ id: string }>()
);

export const getProjectSuccess = createAction(
    ProjectActionsEnum.GET_PROJECT_SUCCESS,
    props<{ project: ProjectDto }>()
);

export const updateProject = createAction(
    ProjectActionsEnum.UPDATE_PROJECT,
    props<{ project: ProjectDto }>()
);

export const updateProjectSuccess = createAction(
    ProjectActionsEnum.UPDATE_PROJECT_SUCCESS,
    props<{ project: ProjectDto }>()
);