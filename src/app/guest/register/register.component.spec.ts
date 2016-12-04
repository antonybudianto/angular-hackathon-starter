import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthService } from './../../core/auth/auth.service';
import { RegisterComponent } from './register.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

let component: RegisterComponent;
let fixture: ComponentFixture<RegisterComponent>;
let mockAuthService: any;
let mockRouter: any;

describe('RegisterComponent', () => {
  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['createUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
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
      expect(mockAuthService.createUser).not.toHaveBeenCalled();
    });

    it('should display error when agree is not checked', () => {
      const mockForm = {
        valid: true,
        value: {
          agree: false
        }
      };
      expect(component.submitted).toBeFalsy();
      expect(component.errorMessage).toBeUndefined();
      component.handleSubmit(mockForm);
      expect(component.submitted).toBeTruthy();
      expect(component.errorMessage).toBeDefined();
      expect(mockAuthService.createUser).not.toHaveBeenCalled();
    });

    it('should create user successfully', async(() => {
      const mockForm = {
        valid: true,
        value: {
          agree: true
        }
      };
      mockAuthService.createUser.and.returnValue(Promise.resolve());
      expect(component.submitted).toBeFalsy();
      expect(component.errorMessage).toBeUndefined();
      expect(component.afterRegister).toBeFalsy();
      component.handleSubmit(mockForm);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.afterRegister).toBeTruthy();
        expect(component.submitted).toBeTruthy();
        expect(component.errorMessage).toEqual('');
        expect(mockAuthService.createUser).toHaveBeenCalled();
      });
    }));

    it('should handle failed creating user', () => {
      const mockForm = {
        valid: true,
        value: {
          agree: true
        }
      };
      const mockError = {
        message: 'error'
      };
      mockAuthService.createUser.and.returnValue(Promise.reject(mockError));
      expect(component.submitted).toBeFalsy();
      expect(component.errorMessage).toBeUndefined();
      expect(component.afterRegister).toBeFalsy();
      component.handleSubmit(mockForm);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.afterRegister).toBeFalsy();
        expect(component.submitted).toBeTruthy();
        expect(component.errorMessage).toEqual(mockError.message);
        expect(mockAuthService.createUser).toHaveBeenCalled();
      });
    });
  });
});
