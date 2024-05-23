import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';

const selectEmployees = (state: IAppState) => state.employees;

export const selectEmployeesList = createSelector(
    selectEmployees,
    state => state.employees
);

export const selectEmployee = createSelector(
    selectEmployees,
    state => state.employee
);