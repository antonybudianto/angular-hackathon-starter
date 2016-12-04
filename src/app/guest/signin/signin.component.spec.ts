import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthService } from './../../core/auth/auth.service';
import { SignInComponent } from './signin.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

let component: SignInComponent;
let fixture: ComponentFixture<SignInComponent>;
let mockAuthService: any;
let mockRouter: any;

describe('SignInComponent', () => {
  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['loginWithPassword']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        FormsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        {
          provide: AuthService, useValue: mockAuthService
        },
        {
          provide: Router, useValue: mockRouter
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should handle social success login', () => {
    component.handleSuccessLogin();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  describe('handleSubmit', () => {
    it('should do nothing when form is invalid', () => {
      const mockForm = {
        valid: false
      };
      expect(component.submitted).toBeFalsy();
      component.handleSubmit(mockForm);
      expect(component.submitted).toBeTruthy();
      expect(mockAuthService.loginWithPassword).not.toHaveBeenCalled();
    });

    it('should login successfully', async(() => {
      const mockForm = {
        valid: true,
        value: {
          email: 'test@t.com',
          password: 'asd'
        }
      };
      mockAuthService.loginWithPassword.and.returnValue(Promise.resolve());
      expect(component.submitted).toBeFalsy();
      expect(component.errorMessage).toBeUndefined();
      component.handleSubmit(mockForm);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.submitted).toBeTruthy();
        expect(component.errorMessage).toEqual('');
        expect(mockAuthService.loginWithPassword).toHaveBeenCalled();
      });
    }));

    it('should handle failed login', async(() => {
      const mockForm = {
        valid: true,
        value: {
          email: 'test@t.com',
          password: 'asd'
        }
      };
      const mockError = {
        message: 'error'
      };
      mockAuthService.loginWithPassword.and.returnValue(Promise.reject(mockError));
      expect(component.submitted).toBeFalsy();
      expect(component.errorMessage).toBeUndefined();
      component.handleSubmit(mockForm);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.submitted).toBeTruthy();
        expect(component.errorMessage).toEqual(mockError.message);
        expect(mockAuthService.loginWithPassword).toHaveBeenCalled();
      });
    }));
  });
});
