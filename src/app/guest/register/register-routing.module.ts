import { RegisterComponent } from './register.component';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Array<Route> = [
    {
        path: '',
        component: RegisterComponent
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
export class RegisterRoutingModule {}
