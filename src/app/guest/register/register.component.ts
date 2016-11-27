import { User } from './../../core/auth/user.model';
import { Component } from '@angular/core';

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

    constructor(private authService: AuthService) {
        this.submitted = false;
        this.isLoading = false;
        this.afterRegister = false;
        this.registerModel = {
            name: '',
            email: '',
            password: ''
        };
    }

    handleSubmit(form: any) {
        let formValue = form.value;
        this.submitted = true;
        this.errorMessage = '';

        if (!form.valid) {
            return;
        }

        let newUser = new User('', formValue.name, formValue.email, formValue.password);
        this.isLoading = true;

        this.authService
            .createUser(newUser)
            .then(
                res => {
                    this.afterRegister = true;
                    console.log(res);
                },
                err => this.errorMessage = err.message)
            .then(() => {
                this.isLoading = false;
            });
    }
}
