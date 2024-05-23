import { createReducer, on } from '@ngrx/store';
import * as CvActions from '../actions/cv.actions';
import { cvInitialState } from '../states/cv.state';

export const cvReducer = createReducer(
    cvInitialState,
    on(CvActions.getCvs, state => state),
    on(CvActions.getCvsSuccess, (state, { cvs }) => {
        return {
            ...state,
            cvs
        };
    }),
    on(CvActions.createCv, state => state),
    on(CvActions.createCvSuccess, (state, { cv }) => {
        return {
            ...state,
            cvs: [...state.cvs, cv]
        };
    }),
    on(CvActions.getCv, state => state),
    on(CvActions.getCvSuccess, (state, { cv }) => {
        return {
            ...state,
            cv
        };
    }),
    on(CvActions.updateCv, state => state),
    on(CvActions.updateCvSuccess, (state, { cv }) => {
        return {
            ...state,
            cvs: state.cvs.map(c => c.id === cv.id ? cv : c)
        };
    }),
    on(CvActions.deleteCv, state => state),
    on(CvActions.deleteCvSuccess, (state, { id }) => {
        return {
            ...state,
            cvs: state.cvs.filter(c => c.id !== id)
        };
    })
)