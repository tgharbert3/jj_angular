import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, tap, of } from 'rxjs';
import { ImageMetadata, ImageService } from './image.service';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  metadataList: any[] = [];

  // private thumbsUrlPageBase = 'https://hopper.cis.uncw.edu:5001/gallery/load?page=';
  // private thumbImageUrl = 'https://hopper.cis.uncw.edu:5001/gallery/thumb?filename=';
  // private allThumbURL = 'https://hopper.cis.uncw.edu:5001/thumbs/load';

  private thumbsUrlPageBase = 'https://localhost:5001/gallery/load?page=';
  private thumbImageUrl = 'https://localhost:5001/gallery/thumb?filename=';
  private allThumbURL = 'https://localhost:5001/thumbs/load';

  constructor(private http: HttpClient, private imageService: ImageService) {
  }

  loadThumbFilenamesByPage(pageNumber: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.thumbsUrlPageBase}${pageNumber}`, { withCredentials: true });
  }

  getThumbBlob(filename: string): Observable<Blob> {
    const image = this.http.get(`${this.thumbImageUrl}${filename}`, { responseType: 'blob', withCredentials: true })
    return image
  }

  loadAllThumbsFilenames() {
    return this.http.get<string[]>(`${this.allThumbURL}`, { withCredentials: true });
  };

  getAllImagesMetaData() {
    this.imageService.getAllImagesMetaData().pipe(
      tap((data: ImageMetadata[]) => { this.metadataList = data }),
      catchError((error) => {
        console.error(`Error in loading metadata: ${error}`)
        return of([]);
      })
    ).subscribe()
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

