import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
    constructor(private af: AngularFire) {
    }

    loginWithPassword(email: string, password: string): Promise<any> {
        return this.af.auth
            .login({ email: email, password: password })
            .then(
                res => Promise.resolve(res),
                err => Promise.reject({
                    message: err.message
                })
            );
    }

    loginWithGoogle(): Promise<any> {
        return this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        });
    }

    loginWithFacebook(): Promise<any> {
        return this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        });
    }

    loginWithTwitter(): Promise<any> {
        return this.af.auth.login({
            provider: AuthProviders.Twitter,
            method: AuthMethods.Popup
        });
    }

    logout() {
        this.af.auth.logout();
    }
}
