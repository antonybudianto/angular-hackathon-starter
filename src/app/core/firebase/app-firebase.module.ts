import { NgModule } from '@angular/core';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

const firebaseConfig: any = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
};

const firebaseAuthConfig: any = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};

@NgModule({
    imports: [
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
    ]
})
export class AppFirebaseModule {

}
