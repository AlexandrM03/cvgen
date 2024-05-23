import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from '../dto/employee.dto';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(
        private http: HttpClient
    ) { }

    getEmployees(): Observable<EmployeeDto[]> {
        return this.http.get<EmployeeDto[]>('/employee');
    }

    createEmployee(employee: EmployeeDto): Observable<EmployeeDto> {
        return this.http.post<EmployeeDto>('/employee', employee);
    }

    getEmployee(id: string): Observable<EmployeeDto> {
        return this.http.get<EmployeeDto>(`/employee/${id}`);
    }

    updateEmployee(employee: EmployeeDto): Observable<EmployeeDto> {
        return this.http.put<EmployeeDto>(`/employee/${employee.id}`, employee);
    }
}
