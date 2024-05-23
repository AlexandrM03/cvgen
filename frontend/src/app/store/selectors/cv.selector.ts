import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';

const selectCvs = (state: IAppState) => state.cvs;

export const selectCvsList = createSelector(
    selectCvs,
    state => state.cvs
);

export const selectCv = createSelector(
    selectCvs,
    state => state.cv
);