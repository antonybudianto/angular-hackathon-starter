import { Component } from '@angular/core';

import { MAIN } from './shared/constant/main';

@Component({
    selector: 'app-main',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css'
    ]
})
export class AppComponent {
    public appBrand: string;

    constructor() {
        this.appBrand = MAIN.APP.BRAND;
    }
}
