import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

import { AboutComponent } from './about/about.component';

import { DashboardLayoutComponent } from './_layouts/dashboard/dashboard-layout.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'login/:redirect', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    // Dashboard
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [AuthGuard],
        title: 'Dashboard',
        children: [
            { path: '', loadChildren: () => import('./dashboard/home/home.module').then(m => m.HomeModule) },
            { path: 'about', component: AboutComponent },
        ]
    }
];
