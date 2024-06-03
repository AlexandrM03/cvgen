
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { IAppState } from '../../../store/states/app.state';
import { ProjectActionsEnum } from '../../../store/actions/project.action';

function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const dateRange = control.value;
    if (!dateRange || dateRange.length !== 2) {
        return { 'dateRangeError': true };
    }
    return null;
}


@Component({
    selector: 'app-add-project-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, TranslateModule, NzModalModule, NzDatePickerModule],
    templateUrl: './add-project-form.component.html'
})
export class AddProjectFormComponent implements OnInit {
    @Input() isVisible: boolean;
    @Output() isVisibleChange = new EventEmitter<boolean>();

    projectForm: FormGroup;
    isConfirmLoading = false;

    constructor(private fb: FormBuilder, private store: Store<IAppState>) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.projectForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            responsibilities: ['', Validators.required],
            teamSize: ['', [Validators.required, Validators.min(1)]],
            dateRange: ['', [Validators.required, dateRangeValidator]]
        });
    }

    onSubmit(): void {
        if (this.projectForm.valid) {
            this.isConfirmLoading = true;
            this.store.dispatch({
                type: ProjectActionsEnum.CREATE_PROJECT, project: {
                    startDate: this.projectForm.get('dateRange').value[0],
                    endDate: this.projectForm.get('dateRange').value[1],
                    ...this.projectForm.value
                }
            });
            this.isConfirmLoading = false;
            this.isVisible = false;
            this.isVisibleChange.emit(this.isVisible);
            this.projectForm.reset();
        } else {
            Object.values(this.projectForm.controls).forEach(control => {
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
