import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './signin.component';
import { SignInRoutingModule } from './signin-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        CommonModule,
        SignInRoutingModule,
        FormsModule
    ]
})
export class SignInModule {}
