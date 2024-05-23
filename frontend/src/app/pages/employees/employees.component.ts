import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EmployeeDto } from '../../dto/employee.dto';
import { EmployeeTableComponent } from '../../shared/components/employee-table/employee-table.component';
import { Store, select } from '@ngrx/store';
import { EmployeeActionsEnum } from '../../store/actions/employee.action';
import { Observable } from 'rxjs';
import { IAppState } from '../../store/states/app.state';
import { selectEmployeesList } from '../../store/selectors/employee.selector';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AddEmployeeFormComponent } from '../../shared/components/add-employee-form/add-employee-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-employees',
    standalone: true,
    imports: [EmployeeTableComponent, CommonModule, NzButtonModule, AddEmployeeFormComponent, TranslateModule],
    templateUrl: './employees.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit {
    constructor(
        private store: Store<IAppState>
    ) { }

    isVisible = false;

    showModal(): void {
        this.isVisible = true;
    }

    employees$: Observable<EmployeeDto[]> = this.store.pipe(select(selectEmployeesList));

    ngOnInit(): void {
        this.store.dispatch({ type: EmployeeActionsEnum.GET_EMPLOYEES });
    }
}
