import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { User, UserRole } from "../models/user";
import { environment } from "../../../environments/environment";
import { catchError, map, Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly LOGIN_URL = `${environment.apiUrl}/auth/login`;
  private http = inject(HttpClient);
  loggedInUser$ = signal<User | undefined>(this.getUserFromStorage()); // Restore from localStorage

  public login(userName: string, password: string): Observable<User> {
    return this.http
      .post<User>(this.LOGIN_URL, { username: userName, password: password })
      .pipe(
        map(resp => {
          const user: User = {
            username: resp.username ?? userName,
            role: resp.role ?? UserRole.Admin, // Hardcoded for now, changed after API changes
            token: resp.token,
          };
          this.loggedInUser$.set(user);
          localStorage.setItem('loggedInUser', JSON.stringify(user)); // Cache token in localStorage
          return user;
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => new Error('Invalid username or password.'));
        })
      );
  }

  private getUserFromStorage(): User | undefined {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : undefined;
  }

  public logout() {
    this.loggedInUser$.set(undefined);
    localStorage.removeItem('loggedInUser'); // Remove loggedInUser from localStorage
  }
}