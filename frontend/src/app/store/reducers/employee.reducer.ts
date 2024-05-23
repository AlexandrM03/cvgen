import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from '../actions/employee.action';
import { employeeInitialState } from '../states/employee.state';

export const employeeReducer = createReducer(
    employeeInitialState,
    on(EmployeeActions.getEmployees, state => state),
    on(EmployeeActions.getEmployeesSuccess, (state, { employees }) => {
        return {
            ...state,
            employees
        };
    }),
    on(EmployeeActions.createEmployee, state => state),
    on(EmployeeActions.createEmployeeSuccess, (state, { employee }) => {
        return {
            ...state,
            employees: [...state.employees, employee]
        };
    }),
    on(EmployeeActions.getEmployee, state => state),
    on(EmployeeActions.getEmployeeSuccess, (state, { employee }) => {
        return {
            ...state,
            employee
        };
    }),
    on(EmployeeActions.updateEmployee, state => state),
    on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => {
        return {
            ...state,
            employees: state.employees.map(e => e.id === employee.id ? employee : e)
        };
    })
)
