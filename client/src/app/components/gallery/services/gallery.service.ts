import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private thumbsUrl = 'https://hopper.cis.uncw.edu:5001/thumbs'
  constructor(private http: HttpClient) { }

  getThumbs(): Observable<thumb[]> {
    const thumbs = this.http.get<thumb[]>(this.thumbsUrl)
    return thumbs;
  }
}

export interface thumb {
  id: String,
  filename: String,
}