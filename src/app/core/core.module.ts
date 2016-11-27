import { AuthService } from './auth/auth.service';
import { AppFirebaseModule } from './firebase/app-firebase.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from './navbar/navbar.module';

@NgModule({
    imports: [
        CommonModule,
        AppFirebaseModule,
        NavbarModule
    ],
    exports: [
        NavbarModule
    ],
    providers: [
        AuthService
    ]
})
export class CoreModule {
}
