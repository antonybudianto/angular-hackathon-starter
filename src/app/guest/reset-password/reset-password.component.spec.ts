import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthService } from './../../core/auth/auth.service';
import { ResetPasswordComponent } from './reset-password.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

let component: ResetPasswordComponent;
let fixture: ComponentFixture<ResetPasswordComponent>;
let mockAuthService: any;
let mockRouter: any;

describe('ResetPasswordComponent', () => {
  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['sendPasswordResetEmail']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
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
    fixture = TestBed.createComponent(ResetPasswordComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  describe('handleSubmit', () => {
    it('should do nothing when form is invalid', () => {
      const mockForm = {
        valid: false
      };
      expect(component.submitted).toBeFalsy();
      component.handleSubmit(mockForm);
      expect(component.submitted).toBeTruthy();
      expect(mockAuthService.sendPasswordResetEmail).not.toHaveBeenCalled();
    });

    it('should send successfully', async(() => {
      const mockForm = {
        valid: true,
        value: {
          email: 'test@t.com',
          password: 'asd'
        }
      };
      mockAuthService.sendPasswordResetEmail.and.returnValue(Promise.resolve());
      expect(component.afterReset).toBeFalsy();
      expect(component.submitted).toBeFalsy();
      expect(component.errorMessage).toBeUndefined();
      component.handleSubmit(mockForm);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.submitted).toBeTruthy();
        expect(component.afterReset).toBeTruthy();
        expect(component.errorMessage).toEqual('');
        expect(mockAuthService.sendPasswordResetEmail).toHaveBeenCalled();
      });
    }));

    it('should handle failed send', async(() => {
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
      mockAuthService.sendPasswordResetEmail.and.returnValue(Promise.reject(mockError));
      expect(component.submitted).toBeFalsy();
      expect(component.errorMessage).toBeUndefined();
      component.handleSubmit(mockForm);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.submitted).toBeTruthy();
        expect(component.errorMessage).toEqual(mockError.message);
        expect(mockAuthService.sendPasswordResetEmail).toHaveBeenCalled();
      });
    }));
  });
});
