import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface thumbFilePath {
  filename: String,
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private thumbsUrlBase = 'https://hopper.cis.uncw.edu:5001/gallery?page='
  constructor(private http: HttpClient) { }

  loadThumbFilenamesByPage(pageNumber: number): Observable<thumbFilePath[]> {
    const thumbs = this.http.get<thumbFilePath[]>(`${this.thumbsUrlBase}${pageNumber}`)
    return thumbs;
  }



  // getImage(): Observable<Blob> {
  //   const image = this.http.get(this.imageUrl, { responseType: 'blob' })
  //   return image
  // }
}