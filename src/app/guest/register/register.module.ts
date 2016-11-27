import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RegisterRoutingModule
    ],
    declarations: [
        RegisterComponent
    ]
})
export class RegisterModule {}
