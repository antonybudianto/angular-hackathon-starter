import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResetPasswordComponent } from './reset-password.component';

const routes: Array<Route> = [
    {
        path: '',
        component: ResetPasswordComponent
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
export class ResetPasswordRoutingModule {}
