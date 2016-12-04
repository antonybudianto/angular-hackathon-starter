import { async } from '@angular/core/testing';
import { User } from './user.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

const mockAuthSource: Subject<any> = new Subject<any>();

const mockUser: User = {
  uid: '123',
  name: 'Test',
  email: 'test@t.com',
  password: 'asd'
};

let mockAngularFire: any;
let mockFirebaseAuth;

describe('Auth Service', () => {
  let service: AuthService;

  beforeEach(() => {
    mockFirebaseAuth = jasmine.createSpyObj('auth', ['sendPasswordResetEmail']);
    spyOn(firebase, 'auth').and.returnValue(mockFirebaseAuth);
    mockAngularFire = {
      auth: mockAuthSource.asObservable(),
      database: {
        object: jasmine.createSpy('object')
      }
    };
    mockAngularFire.auth.createUser = jasmine.createSpy('createUser');
    mockAngularFire.auth.login = jasmine.createSpy('login');
    mockAngularFire.auth.logout = jasmine.createSpy('logout');

    service = new AuthService(mockAngularFire);
  });

  it('should be created successfully', () => {
    expect(service).toBeDefined();
  });

  it('should set password reset email', () => {
    service.sendPasswordResetEmail('antonybudianto@gmail.com');
    expect(mockFirebaseAuth.sendPasswordResetEmail).toHaveBeenCalled();
  });

  it('can login with google', () => {
    service.loginWithGoogle();
    expect(mockAngularFire.auth.login).toHaveBeenCalled();
  });

  it('can login with facebook', () => {
    service.loginWithFacebook();
    expect(mockAngularFire.auth.login).toHaveBeenCalled();
  });

  it('can login with twitter', () => {
    service.loginWithTwitter();
    expect(mockAngularFire.auth.login).toHaveBeenCalled();
  });

  it('should logout successfully', () => {
    service.logout();
    expect(mockAngularFire.auth.logout).toHaveBeenCalled();
  });

  describe('loginWithPassword', () => {
    it('should login successfully', () => {
      const mockResult = {
        message: 'ok'
      };
      mockAngularFire.auth.login
        .and.returnValue(Promise.resolve(mockResult));
      service.loginWithPassword('test@t.com', 'asd')
        .then(result => expect(result).toEqual(mockResult));
    });

    it('should handle login error', () => {
      const mockError = {
        message: 'error'
      };
      mockAngularFire.auth.login
        .and.returnValue(Promise.reject(mockError));
      service.loginWithPassword('test@t.com', 'asd')
        .then(null, error => expect(error).toEqual(mockError));
    });
  });

  describe('getAuth$', () => {
    it('should handle unauthenticated state', () => {
      const subscription: Subscription = service
      .getAuth$()
      .take(1)
      .subscribe(user => {
        expect(user).toBeNull();
      });
      mockAuthSource.next(null);
    });

    it('should handle Observable of user when authenticated', () => {
      mockAngularFire.database.object
        .and.returnValue(Observable.of(mockUser));
      const subscription: Subscription = service
      .getAuth$()
      .take(1)
      .subscribe(user => {
        expect(user).toEqual(mockUser);
      });
      mockAuthSource.next(true);
    });
  });

  describe('createUser', () => {
    it('should create successfully', () => {
      const mockResult = {
        uid: 123
      };
      const mockObject = {
          set: jasmine.createSpy('set').and.returnValue(Promise.resolve())
      };
      mockAngularFire.database.object.and.returnValue(mockObject);
      mockAngularFire.auth.createUser
        .and.returnValue(Promise.resolve(mockResult));
      service.createUser(mockUser)
        .then(result => expect(result).toEqual(mockResult));
    });

    it('should handle error', () => {
      const mockError = {
        message: 'test'
      };
      mockAngularFire.auth.createUser
        .and.returnValue(Promise.reject(mockError));
      service.createUser(mockUser)
        .then(null, err => expect(err).toEqual(mockError));
    });
  });

  describe('sendVerificationEmail', () => {
    it('should send once', () => {
      const mockAuth = {
        auth: jasmine.createSpyObj('auth', ['sendEmailVerification'])
      };
      service.sendVerificationEmail();
      mockAuthSource.next(null);
      mockAuthSource.next(mockAuth);
      expect(mockAuth.auth.sendEmailVerification).toHaveBeenCalled();
    });

    it('should not send when unauthenticated', () => {
      const mockAuth = {
        auth: jasmine.createSpyObj('auth', ['sendEmailVerification'])
      };
      service.sendVerificationEmail();
      mockAuthSource.next(null);
      expect(mockAuth.auth.sendEmailVerification).not.toHaveBeenCalled();
    });
  });
});
