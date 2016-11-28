import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SocialLoginModule } from './social-login/social-login.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        SocialLoginModule
    ]
})
export class SharedModule { }
