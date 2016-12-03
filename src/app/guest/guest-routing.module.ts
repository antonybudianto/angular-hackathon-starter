import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Array<Route> = [
    {
        path: 'register',
        loadChildren: 'app/guest/register/register.module#RegisterModule'
    },
    {
        path: 'signin',
        loadChildren: 'app/guest/signin/signin.module#SignInModule'
    },
    {
        path: 'reset-password',
        loadChildren: 'app/guest/reset-password/reset-password.module#ResetPasswordModule'
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
export class GuestRoutingModule {}
