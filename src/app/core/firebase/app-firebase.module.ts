import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { firebaseConfig } from './config';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ]
})
export class AppFirebaseModule {

}
