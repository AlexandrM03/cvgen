import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';

const selectProjects = (state: IAppState) => state.projects;

export const selectProjectsList = createSelector(
    selectProjects,
    (state) => state.projects
);

export const selectProject = createSelector(
    selectProjects,
    (state) => state.project
);