import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { UpdateEmployeeFormComponent } from '../../shared/components/update-employee-form/update-employee-form.component';
import { IAppState } from '../../store/states/app.state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectEmployee } from '../../store/selectors/employee.selector';
import { getEmployee } from '../../store/actions/employee.action';
import { CvListComponent } from '../../shared/components/cv-list/cv-list.component';
import { selectCvsList } from '../../store/selectors/cv.selector';
import { createCv, deleteCv, getCvs } from '../../store/actions/cv.actions';

@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [CommonModule, NzTabsModule, UpdateEmployeeFormComponent, CvListComponent],
    templateUrl: './employee.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {
    constructor(
        private store: Store<IAppState>,
        private route: ActivatedRoute
    ) { }

    employee$ = this.store.pipe(select(selectEmployee));
    cvs$ = this.store.pipe(select(selectCvsList));
    id: string;

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.store.dispatch(getEmployee({ id: this.id }));
        this.store.dispatch(getCvs({ id: this.id }));
    }

    onDelete(id: string): void {
        this.store.dispatch(deleteCv({ id }));
    }

    onCreate(): void {
        this.store.dispatch(createCv({ id: this.id }));
    }
}
