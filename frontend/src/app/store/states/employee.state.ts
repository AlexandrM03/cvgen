import { EmployeeDto } from '../../dto/employee.dto';

export interface EmployeeState {
    employees: EmployeeDto[];
    employee: EmployeeDto;
}

export const employeeInitialState: EmployeeState = {
    employees: [],
    employee: null
};