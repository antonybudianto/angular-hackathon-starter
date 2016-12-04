import {
    RouterTestingModule
} from '@angular/router/testing';
import {
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';
import { provideRoutes, Routes, RouterModule } from '@angular/router';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@Component({
    selector: 'app-test-cmp',
    template: '<div class="title">Hello test</div>'
})
class TestRouterComponent {
}

let config: Routes = [
    {
        path: '', component: TestRouterComponent
    }
];

let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestRouterComponent,
                AppComponent
            ],
            imports: [ RouterTestingModule, RouterModule ],
            providers: [ provideRoutes(config) ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled).toBeDefined();
    });
});
