import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {
}
