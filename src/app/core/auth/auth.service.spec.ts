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

let mockAfAuth: any;
let mockAfDb;
// let mockFirebaseAuth;

describe('Auth Service', () => {
  let service: AuthService;

  beforeEach(() => {
    // mockFirebaseAuth = jasmine.createSpyObj('auth', ['sendPasswordResetEmail']);
    // spyOn(firebase, 'auth').and.returnValue(mockFirebaseAuth);
    mockAfAuth = {
      auth: jasmine.createSpyObj('afAuth', [
        'signOut',
        'signInWithPopup',
        'signInWithEmailAndPassword',
        'sendPasswordResetEmail',
        'sendEmailVerification',
        'createUserWithEmailAndPassword'
      ]),
      authState: mockAuthSource.asObservable()
    };
    mockAfDb = {
      object: jasmine.createSpy('object')
    };

    service = new AuthService(mockAfAuth, mockAfDb);
  });

  it('should be created successfully', () => {
    expect(service).toBeDefined();
  });

  it('should set password reset email', () => {
    service.sendPasswordResetEmail('antonybudianto@gmail.com');
    expect(mockAfAuth.auth.sendPasswordResetEmail).toHaveBeenCalled();
  });

  it('can login with google', () => {
    service.loginWithGoogle();
    expect(mockAfAuth.auth.signInWithPopup).toHaveBeenCalled();
  });

  it('can login with facebook', () => {
    service.loginWithFacebook();
    expect(mockAfAuth.auth.signInWithPopup).toHaveBeenCalled();
  });

  it('can login with twitter', () => {
    service.loginWithTwitter();
    expect(mockAfAuth.auth.signInWithPopup).toHaveBeenCalled();
  });

  it('should logout successfully', () => {
    service.logout();
    expect(mockAfAuth.auth.signOut).toHaveBeenCalled();
  });

  describe('loginWithPassword', () => {
    it('should login successfully', () => {
      const mockResult = {
        message: 'ok'
      };
      mockAfAuth.auth.signInWithEmailAndPassword
        .and.returnValue(Promise.resolve(mockResult));
      service.loginWithPassword('test@t.com', 'asd')
        .then(result => expect(result).toEqual(mockResult));
    });

    it('should handle login error', () => {
      const mockError = {
        message: 'error'
      };
      mockAfAuth.auth.signInWithEmailAndPassword
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
      mockAfDb.object
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
      mockAfDb.object.and.returnValue(mockObject);
      mockAfAuth.auth.createUserWithEmailAndPassword
        .and.returnValue(Promise.resolve(mockResult));
      service.createUser(mockUser)
        .then(result => expect(result).toEqual(mockResult));
    });

    it('should handle error', () => {
      const mockError = {
        message: 'test'
      };
      mockAfAuth.auth.createUserWithEmailAndPassword
        .and.returnValue(Promise.reject(mockError));
      service.createUser(mockUser)
        .then(null, err => expect(err).toEqual(mockError));
    });
  });

  describe('sendVerificationEmail', () => {
    it('should send once', () => {
      service.sendVerificationEmail();
      mockAuthSource.next(null);
      mockAuthSource.next(mockAfAuth.auth);
      expect(mockAfAuth.auth.sendEmailVerification).toHaveBeenCalled();
    });

    it('should not send when unauthenticated', () => {
      service.sendVerificationEmail();
      mockAuthSource.next(null);
      expect(mockAfAuth.auth.sendEmailVerification).not.toHaveBeenCalled();
    });
  });
});
