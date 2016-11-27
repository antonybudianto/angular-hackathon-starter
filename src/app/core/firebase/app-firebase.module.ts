import { NgModule } from '@angular/core';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

const firebaseConfig: any = {};
firebaseConfig['apiKey'] =  process.env.FIREBASE_API_KEY;
firebaseConfig['authDomain'] = process.env.FIREBASE_AUTH_DOMAIN;
firebaseConfig['databaseURL'] = process.env.FIREBASE_DATABASE_URL;
firebaseConfig['storageBucket'] = process.env.FIREBASE_STORAGE_BUCKET;
console.log(firebaseConfig);

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
