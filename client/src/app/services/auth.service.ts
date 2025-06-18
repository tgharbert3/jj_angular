import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs';

interface LoginResponse {
  message: string;
  firstName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:5001/login';
  private registerUrl = 'http://localhost:5001/register';
  private logoutUrl = 'http://localhost:5001/logout';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userFirstnameSubject = new BehaviorSubject<string>('');
  public userFirstname$ = this.userFirstnameSubject.asObservable();

  constructor(private http: HttpClient) { }

  public sendLoginInformation(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<LoginResponse>(this.loginUrl, body, { headers, withCredentials: true }).pipe(
      tap((res) => {
        console.log('Login Response:', res);
        this.isAuthenticatedSubject.next(true);
        this.userFirstnameSubject.next(res.firstName);
      }),
      catchError((err) => {
        this.isAuthenticatedSubject.next(false);
        return throwError(() => err);
      })
    );
  }

  public sendRegistrationInformation(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Observable<LoginResponse> {
    const body = { firstName, lastName, email, password, verify_password: confirmPassword };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<LoginResponse>(this.registerUrl, body, { headers, withCredentials: true }).pipe(
      tap((res) => {
        this.isAuthenticatedSubject.next(true);
        this.userFirstnameSubject.next(res.firstName);
      }),
      catchError((err) => {
        this.isAuthenticatedSubject.next(false);
        return throwError(() => err);
      })
    );
  }

  public logout(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.logoutUrl, {}, { headers, withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
        this.userFirstnameSubject.next('');
      }),
      catchError((err) => {
        this.isAuthenticatedSubject.next(false);
        return throwError(() => err);
      })
    );
  }
}
