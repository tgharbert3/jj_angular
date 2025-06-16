import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { ImageService } from './image.service';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  metadataList: any[] = [];

  private thumbsUrlBase = 'https://hopper.cis.uncw.edu:5001/gallery/load?page='
  private thumbImageUrl = 'https://hopper.cis.uncw.edu:5001/gallery/thumb?filename='

  constructor(private http: HttpClient, private imageService: ImageService) {
  }

  loadThumbFilenamesByPage(pageNumber: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.thumbsUrlBase}${pageNumber}`);
  }

  getThumbBlob(filename: string): Observable<Blob> {
    const image = this.http.get(`${this.thumbImageUrl}${filename}`, { responseType: 'blob' })
    return image
  }

  public async loadMetadata(): Promise<any[]> {
    try {
      const metadata = await firstValueFrom(this.imageService.getAllImagesMetaData());
      this.metadataList = metadata;
      return metadata;
    } catch (error) {
      console.error('Failed to load metadata:', error);
      return [];
    }
  }
}

