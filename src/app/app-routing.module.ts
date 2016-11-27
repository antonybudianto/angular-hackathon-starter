import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    {
        path: 'todolist',
        loadChildren: 'app/todolist/todolist.module#TodolistModule'
    },
    {
        path: 'signin',
        loadChildren: 'app/signin/signin.module#SignInModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {

}
