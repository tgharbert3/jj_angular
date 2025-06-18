import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ImageMetadata {
  _id: string;
  image_id: number;
  filename: string;
  caption: string;
  price: number;
  details: string;
}

export interface metadataList {
  imagesMetadata: ImageMetadata[],
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // private imageUrlBase = 'https://hopper.cis.uncw.edu:5001/images'
  // private metadataUrl = 'https://hopper.cis.uncw.edu:5001/images/metadata';

  private imageUrlBase = 'http://localhost:5001/images';
  private metadataUrl = 'http://localhost:5001/images/metadata';

  constructor(private http: HttpClient) { }

  getAllImagesMetaData(): Observable<ImageMetadata[]> {
    const imagesMetada = this.http.get<ImageMetadata[]>(this.metadataUrl);
    return imagesMetada;
  }

  getImageBlob(imageId: number): Observable<Blob> {
    const image = this.http.get(`${this.imageUrlBase}/${imageId}`, { responseType: 'blob' })
    return image
  }
}