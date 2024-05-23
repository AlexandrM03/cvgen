import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProjectDto } from '../../../dto/project.dto';
import { Router } from '@angular/router';

@Component({
    selector: 'app-project-table',
    standalone: true,
    imports: [NzTableModule, CommonModule, TranslateModule],
    templateUrl: './project-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectTableComponent {
    @Input() projects: ProjectDto[] = [];

    constructor(
        private router: Router
    ) { }

    handleClickedRow(id: string): void {
        this.router.navigate(['dashboard', 'project', id]);
    }
}
