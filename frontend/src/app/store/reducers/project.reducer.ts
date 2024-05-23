import { createReducer, on } from '@ngrx/store';
import * as ProjectActions from '../actions/project.action';
import { projectInitialState } from '../states/project.state';

export const projectReducer = createReducer(
    projectInitialState,
    on(ProjectActions.getProjects, state => state),
    on(ProjectActions.getProjectsSuccess, (state, { projects }) => {
        return {
            ...state,
            projects
        };
    }),
    on(ProjectActions.createProject, state => state),
    on(ProjectActions.createProjectSuccess, (state, { project }) => {
        return {
            ...state,
            projects: [...state.projects, project]
        };
    }),
    on(ProjectActions.getProject, state => state),
    on(ProjectActions.getProjectSuccess, (state, { project }) => {
        return {
            ...state,
            project
        };
    }),
    on(ProjectActions.updateProject, state => state),
    on(ProjectActions.updateProjectSuccess, (state, { project }) => {
        return {
            ...state,
            projects: state.projects.map(p => p.id === project.id ? project : p)
        };
    })
)