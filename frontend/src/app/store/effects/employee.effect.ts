import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeActionsEnum, createEmployeeSuccess, getEmployeeSuccess, getEmployeesSuccess, updateEmployeeSuccess } from '../actions/employee.action';

@Injectable()
export class EmployeesEffects {
    loadEmployees$ = createEffect(() => this.actions$.pipe(
        ofType(EmployeeActionsEnum.GET_EMPLOYEES),
        exhaustMap(() => this.employeeService.getEmployees()
            .pipe(
                map(employees => getEmployeesSuccess({ employees })),
                catchError(() => EMPTY)
            ))
    ));

    createEmployee$ = createEffect(() => this.actions$.pipe(
        ofType(EmployeeActionsEnum.CREATE_EMPLOYEE),
        exhaustMap(({ employee }) => this.employeeService.createEmployee(employee)
            .pipe(
                map(employee => createEmployeeSuccess({ employee })),
                catchError(() => EMPTY)
            ))
    ));

    loadEmployee$ = createEffect(() => this.actions$.pipe(
        ofType(EmployeeActionsEnum.GET_EMPLOYEE),
        exhaustMap(({ id }) => this.employeeService.getEmployee(id)
            .pipe(
                map(employee => getEmployeeSuccess({ employee })),
                catchError(() => EMPTY)
            ))
    ));

    updateEmployee$ = createEffect(() => this.actions$.pipe(
        ofType(EmployeeActionsEnum.UPDATE_EMPLOYEE),
        exhaustMap(({ employee }) => this.employeeService.updateEmployee(employee)
            .pipe(
                map(employee => updateEmployeeSuccess({ employee })),
                catchError(() => EMPTY)
            ))
    ));

    constructor(
        private actions$: Actions,
        private employeeService: EmployeeService
    ) { }
}