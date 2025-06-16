import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'https://hopper.cis.uncw.edu:5001/login';

  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  public sendLoginInformation(email: string, password: string): Observable<any> {

    const body = { email: email, password: password };
    const headers = new HttpHeaders({ 'Content-Type': "application/json" });

    return this.http.post(this.loginUrl, body, { headers });
  }
}
