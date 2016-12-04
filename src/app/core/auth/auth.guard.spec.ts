import { Subject } from 'rxjs';
import { AuthGuard } from './auth.guard';

let service: AuthGuard;
let mockFirebaseAuth: any;
let mockRouter: any;
const mockFirebaseAuthSource: Subject<any> = new Subject<any>();

describe('Auth Guard', () => {
  beforeEach(() => {
    mockFirebaseAuth = mockFirebaseAuthSource.asObservable();
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    service = new AuthGuard(mockFirebaseAuth, mockRouter);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should not redirect when authenticated', () => {
    const mockAuthState = {
      message: 'test'
    };
    const subscription = service
      .canActivate()
      .take(1)
      .subscribe(result => expect(result).toBeTruthy());
    mockFirebaseAuthSource.next(mockAuthState);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect when unauthenticated', () => {
    const subscription = service
      .canActivate()
      .take(1)
      .subscribe(result => expect(result).toBeFalsy());
    mockFirebaseAuthSource.next(null);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
