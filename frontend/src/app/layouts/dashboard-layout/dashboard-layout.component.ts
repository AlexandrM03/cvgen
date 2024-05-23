import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NzLayoutModule, HeaderComponent, SidebarComponent, BreadcrumbsComponent],
    templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {

}
