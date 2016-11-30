import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFirebaseModule } from './firebase/app-firebase.module';
import { NavbarModule } from './navbar/navbar.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

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
        AuthService,
        AuthGuard
    ]
})
export class CoreModule {
}
