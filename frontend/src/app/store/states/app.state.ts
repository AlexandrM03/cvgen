import { ActionReducerMap } from '@ngrx/store';
import { employeeReducer } from '../reducers/employee.reducer';
import { EmployeeState } from './employee.state';
import { ProjectState } from './project.state';
import { projectReducer } from '../reducers/project.reducer';
import { CvState } from './cv.state';
import { cvReducer } from '../reducers/cv.reducer';
import { SharedState } from './shared.state';
import { sharedReducer } from '../reducers/shared.reducer';

export interface IAppState {
    employees: EmployeeState;
    projects: ProjectState;
    cvs: CvState;
    shared: SharedState;
}

export const appReducers: ActionReducerMap<IAppState> = {
    employees: employeeReducer,
    projects: projectReducer,
    cvs: cvReducer,
    shared: sharedReducer
};