
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { IAppState } from '../../../store/states/app.state';
import { EmployeeActionsEnum } from '../../../store/actions/employee.action';

@Component({
    selector: 'app-add-employee-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, TranslateModule, NzModalModule],
    templateUrl: './add-employee-form.component.html'
})
export class AddEmployeeFormComponent implements OnInit {
    @Input() isVisible: boolean;
    @Output() isVisibleChange = new EventEmitter<boolean>();

    employeeForm: FormGroup;
    isConfirmLoading = false;

    constructor(private fb: FormBuilder, private store: Store<IAppState>) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.employeeForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            specialization: ['', Validators.required],
            department: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.employeeForm.valid) {
            this.isConfirmLoading = true;
            this.store.dispatch({ type: EmployeeActionsEnum.CREATE_EMPLOYEE, employee: this.employeeForm.value });
            this.isConfirmLoading = false;
            this.isVisible = false;
            this.isVisibleChange.emit(this.isVisible);
            this.employeeForm.reset();
        } else {
            Object.values(this.employeeForm.controls).forEach(control => {
                control.markAsDirty();
                control.updateValueAndValidity();
            });
        }
    }

    onCancel(): void {
        this.isVisible = false;
        this.isVisibleChange.emit(this.isVisible);
    }
}
