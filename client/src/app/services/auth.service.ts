import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface LoginResponse {
  message: string;
  firstName: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loginUrl = 'https://hopper.cis.uncw.edu:5001/login';
  private registerUrl = 'https://hopper.cis.uncw.edu:5001/register';
  private logoutUrl = 'https://hopper.cis.uncw.edu:5001/logout';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userFirstnameSubject = new BehaviorSubject<string>("");
  public userFirstname$ = this.userFirstnameSubject.asObservable();

  constructor(private http: HttpClient) { }

  public sendLoginInformation(email: string, password: string): Observable<any> {

    const body = { email: email, password: password };
    const headers = new HttpHeaders({ 'Content-Type': "application/json" });

    return new Observable(observer => {
      this.http.post<LoginResponse>(this.loginUrl, body, { headers, withCredentials: true }).subscribe({
        next: (response) => {
          console.log("Response: ", response);
          this.isAuthenticatedSubject.next(true);
          this.userFirstnameSubject.next(response.firstName);
          observer.next(response);
        },
        error: (error) => {
          this.isAuthenticatedSubject.next(false);
          observer.error(error);
        }
      })
    })
  }

  public sendRegistrationInformation(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const body = { firstName: firstName, lastName: lastName, email: email, password: password, verify_password: confirmPassword };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return new Observable(observer => {
      this.http.post<LoginResponse>(this.registerUrl, body, { headers, withCredentials: true }).subscribe({
        next: (response) => {
          this.isAuthenticatedSubject.next(true);
          this.userFirstnameSubject.next(response.firstName)//updates the global auth
          observer.next(response); // returns the http response
        },
        error: (error) => {
          this.isAuthenticatedSubject.next(false);
          observer.next(error);
        }
      })
    })
  }

  public logout() {
    const headers = new HttpHeaders({ 'Content-Type': "application/json" });
    return new Observable(observer => {
      this.http.post(this.logoutUrl, {}, { headers, withCredentials: true }).subscribe({
        next: (response) => {
          this.isAuthenticatedSubject.next(false);
          observer.next(response);
        },
        error: (error) => {
          this.isAuthenticatedSubject.next(false);
          observer.next(error);
        }
      })
    })
  }
}

