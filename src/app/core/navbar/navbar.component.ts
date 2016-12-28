import { Router } from '@angular/router';
import { Component, Input, ChangeDetectionStrategy,
    OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        './navbar.component.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnDestroy, OnInit {
    @Input() brand: string;
    user: any;
    private subscriptions: Subscription[] = [];

    constructor(private authService: AuthService,
                private cd: ChangeDetectorRef,
                private router: Router) {}

    ngOnInit() {
        this.subscriptions.push(
            this.authService.getAuth$()
            .subscribe(user => {
                this.user = user;
                this.cd.markForCheck();
            })
        );
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
