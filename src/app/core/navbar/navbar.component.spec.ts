import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { NavbarComponent } from './navbar.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';

let component: NavbarComponent;
let fixture: ComponentFixture<NavbarComponent>;

let mockCDRef: any;
let mockAuthService: any;
let mockRouter: any;

describe('NavbarComponent', () => {
  beforeEach(async(() => {
    mockCDRef = jasmine.createSpyObj('mockCDRef', ['markForCheck']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getAuth$', 'logout']);
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);

    mockAuthService.getAuth$.and.returnValue(Observable.of(null));

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ChangeDetectorRef, useValue: mockCDRef
        },
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
    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
    expect(component.user).toBeNull();
  });

  it('can logout successfully', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
