import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/states/app.state';
import { ProjectDto } from '../../../dto/project.dto';

import { TranslateModule } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProjectService } from '../../../services/project.service';
import { updateProject } from '../../../store/actions/project.action';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-project-form',
    standalone: true,
    imports: [TranslateModule, ReactiveFormsModule, FormsModule, NzFormModule, NzInputModule, NzDatePickerModule, NzButtonModule],
    templateUrl: './update-project-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProjectFormComponent implements OnInit {
    @Input() project: ProjectDto;

    projectForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<IAppState>,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.projectForm = this.fb.group({
            id: [this.project.id],
            name: [this.project.name, Validators.required],
            description: [this.project.description, Validators.required],
            startDate: [this.project.startDate, Validators.required],
            endDate: [this.project.endDate, Validators.required],
            responsibilities: [this.project.responsibilities, Validators.required],
            teamSize: [this.project.teamSize, [Validators.required, Validators.min(1)]]
        });
    }

    onSubmit(event: Event): void {
        event.preventDefault();
        if (this.projectForm.valid) {
            this.store.dispatch(updateProject({ project: this.projectForm.value }));
            this.toastr.success('Project updated successfully');
        } else {
            Object.values(this.projectForm.controls).forEach(control => {
                control.markAsTouched();
            });
        }
    }
}
