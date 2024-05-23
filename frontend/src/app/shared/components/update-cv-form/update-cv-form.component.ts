import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CvDto } from '../../../dto/cv.dto';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TranslateModule } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzSelectComponent, NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/states/app.state';
import { selectLanguages, selectSkills } from '../../../store/selectors/shared.selector';
import { updateCv } from '../../../store/actions/cv.actions';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../../../services/cv.service';
import { selectProjectsList } from '../../../store/selectors/project.selector';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { Observable, map } from 'rxjs';
import { ProjectDto } from '../../../dto/project.dto';
import { UpdateProjectFormComponent } from '../update-project-form/update-project-form.component';

@Component({
    selector: 'app-update-cv-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzFormModule, TranslateModule, NzInputModule, NzButtonModule,
        CommonModule, NzSelectModule, NzSliderModule, NzCollapseModule, UpdateProjectFormComponent
    ],
    templateUrl: './update-cv-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateCvFormComponent implements OnInit {
    @Input() cv: CvDto;

    cvForm: FormGroup;

    skillOptions$ = this.store.select(selectSkills);
    languageOptions$ = this.store.select(selectLanguages);
    projectOptions$ = this.store.select(selectProjectsList);

    get skills() {
        return this.cvForm.get('skills') as FormArray;
    }

    get languages() {
        return this.cvForm.get('languages') as FormArray;
    }

    get projects() {
        return this.cvForm.get('projects') as FormArray;
    }

    getProjectById(id: any): Observable<ProjectDto> {
        return this.projectOptions$.pipe(
            map(projects => {
                return projects.find(p => p.id === id.projectId);
            })
        );
    }


    constructor(
        private fb: FormBuilder,
        private store: Store<IAppState>,
        private toastr: ToastrService,
        private cvService: CvService
    ) { }

    ngOnInit(): void {
        if (this.cv) {
            this.createForm();
        }
    }

    createForm(): void {
        this.cvForm = this.fb.group({
            id: [this.cv.id, Validators.required],
            name: [this.cv.name, Validators.required],
            firstName: [this.cv.firstName, Validators.required],
            lastName: [this.cv.lastName, Validators.required],
            email: [this.cv.email, Validators.required],
            specialization: [this.cv.specialization, Validators.required],
            department: [this.cv.department, Validators.required],
            employeeId: [this.cv.employeeId, Validators.required],
            skills: this.fb.array(this.cv.skills.map(skill => this.fb.group({
                skillId: [skill.skillId, Validators.required],
                level: [skill.level, Validators.required]
            }))),
            languages: this.fb.array(this.cv.languages.map(language => this.fb.group({
                languageId: [language.languageId, Validators.required],
                level: [language.level, Validators.required]
            }))),
            projects: this.fb.array(this.cv.projects.map(project => this.fb.group({
                projectId: [project.projectId, Validators.required]
            }))),
            currentSelectedProjectId: ['']
        });
    }

    onSubmit(): void {
        if (this.cvForm.valid) {
            this.store.dispatch(updateCv({ cv: this.cvForm.value }));
            this.toastr.success('CV updated successfully');
        } else {
            Object.values(this.cvForm.controls).forEach(control => {
                control.markAsTouched();
            });
        }
    }

    onPreview(): void {
        if (this.cvForm.valid) {
            this.cvService.generateCv(this.cvForm.value.id).subscribe(res => {
                window.open(res.url, '_blank');
            });
        } else {
            Object.values(this.cvForm.controls).forEach(control => {
                control.markAsTouched();
            });
            this.toastr.error('Please fill in all required fields to preview the CV');
        }
    }

    addSkill(): void {
        this.skills.push(this.fb.group({
            skillId: ['', Validators.required],
            level: ['', Validators.required]
        }));
    }

    removeSkill(index: number): void {
        this.skills.removeAt(index);
    }

    addLanguage(): void {
        this.languages.push(this.fb.group({
            languageId: ['', Validators.required],
            level: ['', Validators.required]
        }));
    }

    removeLanguage(index: number): void {
        this.languages.removeAt(index);
    }

    addProject(): void {
        this.projects.push(this.fb.group({
            projectId: [this.cvForm.get('currentSelectedProjectId').value, Validators.required]
        }));

        this.cvForm.get('currentSelectedProjectId').reset();
    }

    removeProject(index: number, event: Event): void {
        event.stopPropagation();
        this.projects.removeAt(index);
    }
}
