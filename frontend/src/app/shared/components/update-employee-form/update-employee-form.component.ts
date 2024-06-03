import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDto } from '../../../dto/employee.dto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/states/app.state';
import { ToastrService } from 'ngx-toastr';
import { updateEmployee } from '../../../store/actions/employee.action';

import { TranslateModule } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'app-update-employee-form',
    standalone: true,
    imports: [TranslateModule, ReactiveFormsModule, FormsModule, NzFormModule, NzInputModule, NzDatePickerModule, NzButtonModule],
    templateUrl: './update-employee-form.component.html',
})
export class UpdateEmployeeFormComponent implements OnInit {
    @Input() employee: EmployeeDto;

    employeeForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<IAppState>,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.employeeForm = this.fb.group({
            id: [this.employee.id],
            firstName: [this.employee.firstName, Validators.required],
            lastName: [this.employee.lastName, Validators.required],
            email: [this.employee.email, [Validators.required, Validators.email]],
            specialization: [this.employee.specialization, Validators.required],
            department: [this.employee.department, Validators.required]
        });
    }

    onSubmit(): void {
        if (this.employeeForm.valid) {
            this.store.dispatch(updateEmployee({ employee: this.employeeForm.value }));
            this.toastr.success('Employee updated successfully');
        } else {
            Object.values(this.employeeForm.controls).forEach(control => {
                control.markAsTouched();
            });
        }
    }
}
