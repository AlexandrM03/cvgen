import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CvDto } from '../../../dto/cv.dto';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UpdateCvFormComponent } from '../update-cv-form/update-cv-form.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/states/app.state';
import { getLanguages, getSkills } from '../../../store/actions/shared.actions';
import { getProjects } from '../../../store/actions/project.action';

@Component({
    selector: 'app-cv-list',
    standalone: true,
    imports: [CommonModule, NzTabsModule, NzButtonModule, NzIconModule, UpdateCvFormComponent],
    templateUrl: './cv-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvListComponent implements OnInit {
    @Input() cvs: CvDto[];
    @Output() delete = new EventEmitter<string>();
    @Output() create = new EventEmitter<void>();

    deleteCv(event: any, cv: string): void {
        event.stopPropagation();
        this.delete.emit(cv);
    }

    createCv(): void {
        this.create.emit();
    }

    constructor(
        private store: Store<IAppState>
    ) { }

    ngOnInit(): void {
        this.store.dispatch(getSkills())
        this.store.dispatch(getLanguages())
        this.store.dispatch(getProjects())
    }
}
