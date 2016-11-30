import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './../core/auth/auth.guard';

const routes: Array<Route> = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [
            AuthGuard
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}
