import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { response } from 'express';

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

  private imageUrlBase = 'https://localhost:5001/images';
  private metadataUrl = 'https://localhost:5001/images/metadata';

  constructor(private http: HttpClient) { }

  getAllImagesMetaData(): Observable<ImageMetadata[]> {
    const imagesMetadata = this.http.get<ImageMetadata[]>(this.metadataUrl)
    return imagesMetadata;
  }

  getImageBlob(imageId: number): Observable<Blob> {
    const image = this.http.get(`${this.imageUrlBase}/${imageId}`, { responseType: 'blob', withCredentials: true })
    return image
  }
}