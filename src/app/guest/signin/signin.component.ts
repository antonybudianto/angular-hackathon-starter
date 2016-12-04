import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: [
        './signin.component.css'
    ]
})
export class SignInComponent {
    signInModel: any;
    submitted: boolean;
    errorMessage: string;
    isLoading: boolean;

    constructor(private authService: AuthService,
                private router: Router) {
        this.submitted = false;
        this.isLoading = false;
        this.signInModel = {
            email: '',
            password: ''
        };
    }

    handleSubmit(form: any) {
        let formValue = form.value;
        this.submitted = true;

        if (!form.valid) {
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.authService
            .loginWithPassword(formValue.email, formValue.password)
            .then(res => {
                this.router.navigate(['/dashboard']);
            }, err => this.errorMessage = err.message)
            .then(() => {
                this.isLoading = false;
            });
    }

    handleSuccessLogin() {
        this.router.navigate(['/dashboard']);
    }
}
