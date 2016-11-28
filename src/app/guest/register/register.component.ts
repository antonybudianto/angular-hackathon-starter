import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../../core/auth/user.model';
import { AuthService } from './../../core/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [
        './register.component.css'
    ]
})
export class RegisterComponent {
    registerModel: any;
    submitted: boolean;
    isLoading: boolean;
    errorMessage: string;
    afterRegister: boolean;

    constructor(private authService: AuthService,
                private router: Router) {
        this.submitted = false;
        this.isLoading = false;
        this.afterRegister = false;
        this.registerModel = {
            name: '',
            email: '',
            password: '',
            agree: false
        };
    }

    handleSubmit(form: any) {
        let formValue = form.value;
        this.submitted = true;
        this.errorMessage = '';

        if (!form.valid) {
            return;
        }

        if (!formValue.agree) {
            this.errorMessage = 'You must read and agree to the terms and conditions';
            return;
        }

        let newUser = new User('', formValue.name, formValue.email, formValue.password);
        this.isLoading = true;

        this.authService
            .createUser(newUser)
            .then(
                res => {
                    this.afterRegister = true;
                },
                err => this.errorMessage = err.message)
            .then(() => {
                this.isLoading = false;
            });
    }

    handleSuccessLogin() {
        this.router.navigate(['/dashboard']);
    }
}
