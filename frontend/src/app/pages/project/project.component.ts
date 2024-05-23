import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/states/app.state';
import { selectProject } from '../../store/selectors/project.selector';
import { ProjectActionsEnum, getProject } from '../../store/actions/project.action';
import { ActivatedRoute } from '@angular/router';
import { ProjectDto } from '../../dto/project.dto';
import { CommonModule } from '@angular/common';
import { UpdateProjectFormComponent } from '../../shared/components/update-project-form/update-project-form.component';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule, UpdateProjectFormComponent],
    templateUrl: './project.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
    constructor(
        private store: Store<IAppState>,
        private route: ActivatedRoute
    ) { }

    project$ = this.store.pipe(select(selectProject));
    id: string;

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.store.dispatch(getProject({ id: this.id }));
    }
}
