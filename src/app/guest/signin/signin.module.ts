import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignInComponent } from './signin.component';
import { SignInRoutingModule } from './signin-routing.module';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        SignInRoutingModule,
        FormsModule
    ]
})
export class SignInModule {}
