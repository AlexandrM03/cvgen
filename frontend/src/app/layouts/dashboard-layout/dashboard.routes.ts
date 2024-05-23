import { Routes } from '@angular/router';
import { WelcomeComponent } from '../../pages/welcome/welcome.component';
import { EmployeesComponent } from '../../pages/employees/employees.component';
import { ProjectsComponent } from '../../pages/projects/projects.component';
import { EmployeeComponent } from '../../pages/employee/employee.component';
import { ProjectComponent } from '../../pages/project/project.component';

export const DASHBOARD_ROUTES: Routes = [
    { path: 'employees', component: EmployeesComponent, data: { breadcrumb: 'Employees' } },
    { path: 'projects', component: ProjectsComponent, data: { breadcrumb: 'Projects' } },
    { path: 'employee/:id', component: EmployeeComponent, data: { breadcrumb: 'Employees/:employee' } },
    { path: 'project/:id', component: ProjectComponent, data: { breadcrumb: 'Projects/:project' } },
];
