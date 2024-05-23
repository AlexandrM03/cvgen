import { createReducer, on } from '@ngrx/store';
import * as SharedActions from '../actions/shared.actions';
import { sharedInitialState } from '../states/shared.state';

export const sharedReducer = createReducer(
    sharedInitialState,
    on(SharedActions.getSkills, state => state),
    on(SharedActions.getSkillsSuccess, (state, { skills }) => {
        return {
            ...state,
            skills
        };
    }),
    on(SharedActions.getLanguages, state => state),
    on(SharedActions.getLanguagesSuccess, (state, { languages }) => {
        return {
            ...state,
            languages
        };
    })
)