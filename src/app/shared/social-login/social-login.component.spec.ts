import { SocialLoginComponent } from './social-login.component';
import { AuthService } from './../../core/auth/auth.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

let mockAuthService: any;
let fixtureTest: ComponentFixture<TestHostComponent>;
let component: SocialLoginComponent;
let testComponent: TestHostComponent;

@Component({
  selector: 'app-test',
  template: `
    <app-social-login
      (successLogin)="handleSuccess($event)"
      (failedLogin)="handleError($event)"></app-social-login>
  `
})
class TestHostComponent {
  @Output() failedLogin = new EventEmitter();
  @Output() successLogin = new EventEmitter();

  handleSuccess(result) {
    this.successLogin.next(result);
  }
  handleError(err) {
    this.failedLogin.next(err);
  }
}

describe('SocialLoginComponent', () => {
  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj('authService', [
      'loginWithFacebook',
      'loginWithGoogle',
      'loginWithTwitter'
    ]);

    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, SocialLoginComponent ],
      providers: [
        {
          provide: AuthService, useValue: mockAuthService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixtureTest = TestBed.createComponent(TestHostComponent);
    fixtureTest.detectChanges();
    testComponent = fixtureTest.componentInstance;
    component = fixtureTest.debugElement
      .query(By.directive(SocialLoginComponent)).componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('can login with google', () => {
    const mockResult = {
      uid: 123
    };
    testComponent.successLogin
      .take(1)
      .subscribe(result => expect(result).toEqual(mockResult));
    mockAuthService.loginWithGoogle.and.returnValue(Promise.resolve(mockResult));
    component.loginWithGoogle();
    fixtureTest.detectChanges();
    expect(mockAuthService.loginWithGoogle).toHaveBeenCalled();
  });

  it('can login with facebook', () => {
    mockAuthService.loginWithFacebook.and.returnValue(Promise.resolve());
    component.loginWithFacebook();
    expect(mockAuthService.loginWithFacebook).toHaveBeenCalled();
  });

  it('can login with twitter', () => {
    mockAuthService.loginWithTwitter.and.returnValue(Promise.resolve());
    component.loginWithTwitter();
    expect(mockAuthService.loginWithTwitter).toHaveBeenCalled();
  });

  it('can handle failed login', () => {
    const mockError = {
      message: 'error'
    };

    testComponent.failedLogin
      .take(1)
      .subscribe(err => expect(err).toEqual(mockError));

    mockAuthService.loginWithTwitter.and.returnValue(Promise.reject(mockError));
    component.loginWithTwitter();
    fixtureTest.detectChanges();
    expect(mockAuthService.loginWithTwitter).toHaveBeenCalled();
  });
});
