import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmployeeDto } from '../../../dto/employee.dto';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-table',
    standalone: true,
    imports: [NzTableModule, CommonModule, TranslateModule],
    templateUrl: './employee-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeTableComponent {
    @Input() employees: EmployeeDto[] = [];

    constructor(
        private router: Router
    ) { }

    handleClickedRow(id: string): void {
        this.router.navigate(['dashboard', 'employee', id]);
    }
}
