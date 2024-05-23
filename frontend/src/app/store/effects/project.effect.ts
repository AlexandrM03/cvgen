import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ProjectService } from '../../services/project.service';
import { ProjectActionsEnum, createProjectSuccess, getProjectSuccess, getProjectsSuccess, updateProjectSuccess } from '../actions/project.action';

@Injectable()
export class ProjectsEffects {
    loadProjects$ = createEffect(() => this.actions$.pipe(
        ofType(ProjectActionsEnum.GET_PROJECTS),
        exhaustMap(() => this.projectService.getProjects()
            .pipe(
                map(projects => getProjectsSuccess({ projects })),
                catchError(() => EMPTY)
            ))
    ));

    createProject$ = createEffect(() => this.actions$.pipe(
        ofType(ProjectActionsEnum.CREATE_PROJECT),
        exhaustMap(({ project }) => this.projectService.createProject(project)
            .pipe(
                map(project => createProjectSuccess({ project })),
                catchError(() => EMPTY)
            ))
    ));

    loadProject$ = createEffect(() => this.actions$.pipe(
        ofType(ProjectActionsEnum.GET_PROJECT),
        exhaustMap(({ id }) => this.projectService.getProject(id)
            .pipe(
                map(project => getProjectSuccess({ project })),
                catchError(() => EMPTY)
            ))
    ));

    updateProject$ = createEffect(() => this.actions$.pipe(
        ofType(ProjectActionsEnum.UPDATE_PROJECT),
        exhaustMap(({ project }) => this.projectService.updateProject(project)
            .pipe(
                map(project => updateProjectSuccess({ project })),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private projectService: ProjectService
    ) { }
}