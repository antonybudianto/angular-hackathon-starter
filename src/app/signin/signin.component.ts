import { Component } from '@angular/core';

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

    constructor() {
        this.submitted = false;
        this.signInModel = {
            email: '',
            password: ''
        };
    }

    handleSubmit(value) {
        this.submitted = true;
        console.log(value);
    }
}
