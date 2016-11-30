import { Component, Output, EventEmitter } from '@angular/core';

import { AuthService } from './../../core/auth/auth.service';

@Component({
    selector: 'app-social-login',
    templateUrl: './social-login.component.html',
    styleUrls: [
        './social-login.component.css'
    ]
})
export class SocialLoginComponent {

    @Output()
    private successLogin: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    private failedLogin: EventEmitter<any> = new EventEmitter<any>();

    constructor(private authService: AuthService) {}

    loginWithFacebook() {
        this.handleLoginPromise(this.authService.loginWithFacebook());
    }

    loginWithGoogle() {
        this.handleLoginPromise(this.authService.loginWithGoogle());
    }

    loginWithTwitter() {
        this.handleLoginPromise(this.authService.loginWithTwitter());
    }

    private handleLoginPromise(promise: Promise<any>) {
        promise.then(
            result => this.successLogin.emit(result),
            err => this.failedLogin.next(err));
    }
}
