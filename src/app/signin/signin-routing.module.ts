import { SignInComponent } from './signin.component';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Array<Route> = [
    {
        path: '',
        component: SignInComponent
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
export class SignInRoutingModule {}
