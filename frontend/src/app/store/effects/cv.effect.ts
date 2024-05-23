import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CvService } from '../../services/cv.service';
import { CvActionsEnum, createCvSuccess, deleteCvSuccess, getCvSuccess, getCvsSuccess, updateCvSuccess } from '../actions/cv.actions';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';

@Injectable()
export class CvsEffects {
    loadCvs$ = createEffect(() => this.actions$.pipe(
        ofType(CvActionsEnum.GET_CVS),
        exhaustMap(({ id }) => this.cvService.getCvs(id)
            .pipe(
                map(cvs => getCvsSuccess({ cvs })),
                catchError(() => EMPTY)
            ))
    ));

    createCv$ = createEffect(() => this.actions$.pipe(
        ofType(CvActionsEnum.CREATE_CV),
        exhaustMap(({ id }) => this.cvService.createCv(id)
            .pipe(
                map(cv => createCvSuccess({ cv })),
                catchError(() => EMPTY)
            ))
    ));

    loadCv$ = createEffect(() => this.actions$.pipe(
        ofType(CvActionsEnum.GET_CV),
        exhaustMap(({ id }) => this.cvService.getCv(id)
            .pipe(
                map(cv => getCvSuccess({ cv })),
                catchError(() => EMPTY)
            ))
    ));

    updateCv$ = createEffect(() => this.actions$.pipe(
        ofType(CvActionsEnum.UPDATE_CV),
        exhaustMap(({ cv }) => this.cvService.updateCv(cv)
            .pipe(
                map(cv => updateCvSuccess({ cv })),
                catchError(() => EMPTY)
            ))
    ));

    deleteCv$ = createEffect(() => this.actions$.pipe(
        ofType(CvActionsEnum.DELETE_CV),
        exhaustMap(({ id }) => this.cvService.deleteCv(id)
            .pipe(
                map(cv => deleteCvSuccess({ id: cv.id })),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private cvService: CvService
    ) { }
}