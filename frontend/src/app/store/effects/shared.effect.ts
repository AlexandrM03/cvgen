import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SharedActionsEnum, getLanguagesSuccess, getSkillsSuccess } from '../actions/shared.actions';
import { SharedService } from '../../services/shared.service';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';

@Injectable()
export class SharedEffects {
    loadSkills$ = createEffect(() => this.actions$.pipe(
        ofType(SharedActionsEnum.GET_SKILLS),
        exhaustMap(() => this.sharedService.getSkills()
            .pipe(
                map(skills => getSkillsSuccess({ skills })),
                catchError(() => EMPTY)
            ))
    ));

    loadLanguages$ = createEffect(() => this.actions$.pipe(
        ofType(SharedActionsEnum.GET_LANGUAGES),
        exhaustMap(() => this.sharedService.getLanguages()
            .pipe(
                map(languages => getLanguagesSuccess({ languages })),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private sharedService: SharedService
    ) { }
}