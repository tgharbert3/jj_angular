import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactUrl = 'https://hopper.cis.uncw.edu:5001/contact';

  constructor(private http: HttpClient) { }

  public sendContactInformation(
    name: string | null,
    email: string,
    comments: string,
    subscribe: string,
    anime: boolean | null,
    arts: boolean | null,
    judo: boolean | null,
    lang: boolean | null,
    sci: boolean | null,
    travel: boolean | null,
    hear: string) {

    const body = { name, email, comments, subscribe, anime, arts, judo, lang, sci, travel, hear }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.contactUrl, body, { headers, withCredentials: true }).subscribe({
      next: (response) => {
        console.info("Successful save", response);
      },
      error: (error) => {
        console.error("Error in saving contact", error);
      }
    });
    console.log(body);
  }
}
