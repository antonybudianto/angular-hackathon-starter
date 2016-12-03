import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Subject, Observable, Subscription } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class AuthService {
    private sendEmailSubscription: Subscription;

    constructor(private af: AngularFire) {}

    getAuth$(): Observable<User> {
        return this.af.auth
        .switchMap(auth => {
            if (auth) {
                return this.af.database.object('/users/' + auth.uid);
            }
            return Observable.of(null);
        });
    }

    createUser(user: User): Promise<any> {
        return this.af.auth
            .createUser({
                email: user.email,
                password: user.password
            })
            .then(
                res => {
                    this.sendEmailVerification();
                    return this.af.database
                    .object('/users/' + res.uid)
                    .set({
                        uid: res.uid,
                        name: user.name,
                        email: user.email
                    })
                    .then(() => Promise.resolve(res));
                },
                err => Promise.reject({
                    message: err.message
                })
            );
    }

    sendEmailVerification() {
        this.sendEmailSubscription = this.af.auth
        .filter(auth => !!auth)
        .do(() => {
            if (this.sendEmailSubscription) {
                this.sendEmailSubscription.unsubscribe();
            }
        })
        .subscribe(auth => {
            auth.auth.sendEmailVerification();
        });
    }

    loginWithPassword(email: string, password: string): Promise<any> {
        return this.af.auth
            .login({ email, password })
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
