import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
    },
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
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
