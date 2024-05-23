import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAppState } from '../../store/states/app.state';
import { Store, select } from '@ngrx/store';
import { selectProjectsList } from '../../store/selectors/project.selector';
import { Observable } from 'rxjs';
import { ProjectDto } from '../../dto/project.dto';
import { ProjectActionsEnum } from '../../store/actions/project.action';
import { ProjectTableComponent } from '../../shared/components/project-table/project-table.component';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { AddProjectFormComponent } from '../../shared/components/add-project-form/add-project-form.component';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [ProjectTableComponent, CommonModule, NzButtonModule, TranslateModule, AddProjectFormComponent],
    templateUrl: './projects.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
    constructor(
        private store: Store<IAppState>
    ) { }

    isVisible = false;

    showModal(): void {
        this.isVisible = true;
    }

    projects$: Observable<ProjectDto[]> = this.store.pipe(select(selectProjectsList));

    ngOnInit(): void {
        this.store.dispatch({ type: ProjectActionsEnum.GET_PROJECTS });
    }
}
