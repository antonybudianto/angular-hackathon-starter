import { AuthService } from './../../core/auth/auth.service';
import { Component } from '@angular/core';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: [
        './reset-password.component.css'
    ]
})
export class ResetPasswordComponent {
    submitted: boolean = false;
    errorMessage: string;
    isLoading: boolean;
    email: string;
    afterReset: boolean;

    constructor(private authService: AuthService) {}

    handleSubmit(form: any) {
        this.submitted = true;
        this.errorMessage = null;

        if (!form.valid) {
            return;
        }

        let formValue: any = form.value;
        this.isLoading = true;

        this.authService.sendPasswordResetEmail(formValue.email)
        .then(result => {
            this.email = formValue.email;
            this.afterReset = true;
        }, err => this.errorMessage = err)
        .then(() => this.isLoading = false);

        console.log(formValue);
    }
}
