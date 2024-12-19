import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { environment } from '../../../environments/environment';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should login successfully', (done) => {
    const mockResponse = {
        username: 'testUser',
        role: 'admin',
        token: 'fake-token'
    };
    service.loggedInUser$.set(undefined); // Ensure initial state

    service.login('testUser', 'testPassword')
    .subscribe({
      next: () => {
        expect(service.loggedInUser$()?.token).toEqual('fake-token');
        done();  // 3️⃣ Call done() after the resp is handled
      }
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'testUser', password: 'testPassword' });

    req.flush(mockResponse);

    
  });

  it('should handle login errors', (done) => {
    const errorMessage = 'Login failed';
    service.loggedInUser$.set(undefined); // Ensure initial state

    service.login('testUser', 'testPassword')
    .subscribe({
      next: () => {
        fail('Expected an error, but login succeeded');
      },
      error: (error) => {
        expect(error.message).toBe('Invalid username or password.');
        expect(service.loggedInUser$()).toBeUndefined();
        done(); // 3️⃣ Call done() after the error is handled
      }
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/login`);
    req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
  });
});