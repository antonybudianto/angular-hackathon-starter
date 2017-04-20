import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';

import { User } from './user.model';

@Injectable()
export class AuthService {
    private sendEmailSubscription: Subscription;

    constructor(private afAuth: AngularFireAuth,
                private afDb: AngularFireDatabase) {}

    getAuth$(): Observable<User> {
        return this.afAuth.authState
        .switchMap((auth: any) => {
            if (auth) {
                return this.afDb.object('/users/' + auth.uid);
            }
            return Observable.of(null);
        });
    }

    createUser(user: User): Promise<any> {
        const { email, password } = user;
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(
            res => {
                this.sendVerificationEmail();
                return this.afDb
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

    sendPasswordResetEmail(email: string): Promise<any> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    sendVerificationEmail() {
        this.sendEmailSubscription = this.afAuth.authState
        .filter((auth: any) => !!auth)
        .take(1)
        .subscribe((auth: any) => {
            auth.sendEmailVerification();
        });
    }

    loginWithPassword(email: string, password: string): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(
            res => Promise.resolve(res),
            err => Promise.reject({
                message: err.message
            })
        );
    }

    loginWithGoogle(): Promise<any> {
        return this.afAuth.auth.signInWithPopup(new GoogleAuthProvider());
    }

    loginWithFacebook(): Promise<any> {
        return this.afAuth.auth.signInWithPopup(new FacebookAuthProvider());
    }

    loginWithTwitter(): Promise<any> {
        return this.afAuth.auth.signInWithPopup(new TwitterAuthProvider());
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}
