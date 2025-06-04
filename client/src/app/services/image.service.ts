import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageUrl = 'https://hopper.cis.uncw.edu:5001/images/1'
  constructor(private http: HttpClient) { }

  getImage(): Observable<Blob> {
    const image = this.http.get(this.imageUrl, { responseType: 'blob' })
    return image
  }
}