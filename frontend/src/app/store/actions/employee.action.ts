import { createAction, props } from '@ngrx/store';
import { EmployeeDto } from '../../dto/employee.dto';

export enum EmployeeActionsEnum {
    GET_EMPLOYEES = '[Employee] Get Employees',
    GET_EMPLOYEES_SUCCESS = '[Employee] Get Employees Success',
    CREATE_EMPLOYEE = '[Employee] Create Employee',
    CREATE_EMPLOYEE_SUCCESS = '[Employee] Create Employee Success',
    GET_EMPLOYEE = '[Employee] Get Employee',
    GET_EMPLOYEE_SUCCESS = '[Employee] Get Employee Success',
    UPDATE_EMPLOYEE = '[Employee] Update Employee',
    UPDATE_EMPLOYEE_SUCCESS = '[Employee] Update Employee Success',
}

export const getEmployees = createAction(EmployeeActionsEnum.GET_EMPLOYEES);

export const getEmployeesSuccess = createAction(
    EmployeeActionsEnum.GET_EMPLOYEES_SUCCESS,
    props<{ employees: EmployeeDto[] }>()
);

export const createEmployee = createAction(
    EmployeeActionsEnum.CREATE_EMPLOYEE,
    props<{ employee: EmployeeDto }>()
);

export const createEmployeeSuccess = createAction(
    EmployeeActionsEnum.CREATE_EMPLOYEE_SUCCESS,
    props<{ employee: EmployeeDto }>()
);

export const getEmployee = createAction(
    EmployeeActionsEnum.GET_EMPLOYEE,
    props<{ id: string }>()
);

export const getEmployeeSuccess = createAction(
    EmployeeActionsEnum.GET_EMPLOYEE_SUCCESS,
    props<{ employee: EmployeeDto }>()
);

export const updateEmployee = createAction(
    EmployeeActionsEnum.UPDATE_EMPLOYEE,
    props<{ employee: EmployeeDto }>()
);

export const updateEmployeeSuccess = createAction(
    EmployeeActionsEnum.UPDATE_EMPLOYEE_SUCCESS,
    props<{ employee: EmployeeDto }>()
);