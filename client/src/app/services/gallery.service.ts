import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { ImageService } from './image.service';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  metadataList: any[] = [];

  // private thumbsUrlPageBase = 'https://hopper.cis.uncw.edu:5001/gallery/load?page=';
  // private thumbImageUrl = 'https://hopper.cis.uncw.edu:5001/gallery/thumb?filename=';
  // private allThumbURL = 'https://hopper.cis.uncw.edu:5001/thumbs/load';

  private thumbsUrlPageBase = 'http://localhost:5001/gallery/load?page=';
  private thumbImageUrl = 'http://localhost:5001/gallery/thumb?filename=';
  private allThumbURL = 'http://localhost:5001/thumbs/load';

  constructor(private http: HttpClient, private imageService: ImageService) {
  }

  loadThumbFilenamesByPage(pageNumber: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.thumbsUrlPageBase}${pageNumber}`);
  }

  getThumbBlob(filename: string): Observable<Blob> {
    const image = this.http.get(`${this.thumbImageUrl}${filename}`, { responseType: 'blob' })
    return image
  }

  loadAllThumbsFilenames() {
    return this.http.get<string[]>(`${this.allThumbURL}`);
  };

  public async loadMetadata(): Promise<any[]> {
    try {
      const metadata = await firstValueFrom(this.imageService.getAllImagesMetaData());
      this.metadataList = metadata;
      return metadata;
    } catch (error) {
      console.error('Failed to load metadata:', error);
      return [];
    }
  };

  public shortTitle(title: string): string {
    title = title.slice(0, -4);
    title = title.replace(/_/g, ' ');
    title = title.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    return title;
  }
}

