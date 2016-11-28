import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';

const routes: Array<Route> = [
    {
        path: '',
        component: DashboardComponent
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
