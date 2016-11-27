import { Component } from '@angular/core';

import { AuthService } from './../core/auth/auth.service';

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

    constructor(private authService: AuthService) {
        this.submitted = false;
        this.isLoading = false;
        this.signInModel = {
            email: '',
            password: ''
        };
    }

    handleSubmit(formValue: any) {
        this.submitted = true;
        this.isLoading = true;
        this.errorMessage = '';
        this.authService
            .loginWithPassword(formValue.email, formValue.password)
            .then(res => console.log(res), err => this.errorMessage = err.message)
            .then(() => {
                this.submitted = false;
                this.isLoading = false;
            });
    }
}
