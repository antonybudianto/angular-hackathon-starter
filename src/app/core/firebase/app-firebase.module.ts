import { NgModule } from '@angular/core';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { firebaseConfig } from './config';

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
