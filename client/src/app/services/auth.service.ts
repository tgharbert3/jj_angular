import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'https://hopper.cis.uncw.edu:5001/login';
  private registerUrl = 'https://hopper.cis.uncw.edu:5001/register';

  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  public sendLoginInformation(email: string, password: string): Observable<any> {

    const body = { email: email, password: password };
    const headers = new HttpHeaders({ 'Content-Type': "application/json" });

    return this.http.post(this.loginUrl, body, { headers });
  }

  public sendRegistrationInformation(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const body = { firstName: firstName, lastName: lastName, email: email, password: password, verify_password: confirmPassword };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.registerUrl, body, { headers });
  }
}
