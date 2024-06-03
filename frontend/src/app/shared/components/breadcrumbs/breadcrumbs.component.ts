
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { Observable, filter, map, mergeMap, startWith, switchMap, tap } from 'rxjs';
import { IAppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectEmployee } from '../../../store/selectors/employee.selector';
import { selectProject } from '../../../store/selectors/project.selector';

interface Breadcrumb {
    label: string;
    url: string;
}

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    imports: [NzBreadCrumbModule, RouterModule],
    templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {
    breadcrumbs: Breadcrumb[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<IAppState>
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.route.data.subscribe(data => {
                    this.breadcrumbs = [{ label: data['breadcrumb'], url: '/' }];
                });
                this.route.children.forEach(c => c.data.subscribe(cd => {
                    const segments = cd['breadcrumb'].split('/');
                    segments.forEach((segment: any, index: any) => {
                        console.log(segment);
                        if (segment.startsWith(':')) {
                            if (segment === ':employee') {
                                this.store.select(selectEmployee).subscribe(employee => {
                                    if (employee) {
                                        this.breadcrumbs.push({
                                            label: `${employee.firstName} ${employee.lastName}`,
                                            url: '/' + segments.slice(0, index + 1).join('/')
                                        });
                                    }
                                });
                            } else if (segment === ':project') {
                                this.store.select(selectProject).subscribe(project => {
                                    if (project) {
                                        this.breadcrumbs.push({
                                            label: project.name,
                                            url: '/' + segments.slice(0, index + 1).join('/')
                                        });
                                    }
                                });
                            }
                        } else {
                            this.breadcrumbs.push({ label: segment, url: '/' + segments.slice(0, index + 1).join('/') });
                        }
                    });
                }));
            }
        });
    }
}
