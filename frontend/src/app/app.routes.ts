import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/auth/signin' },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        data: { breadcrumb: 'Dashboard' },
        loadChildren: () => import('./layouts/dashboard-layout/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () => import('./layouts/auth-layout/auth.routes').then(m => m.AUTH_ROUTES)
    },
];
