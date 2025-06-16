import { Component, OnInit, inject } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  private galleryService = inject(GalleryService);

  thumbs: any[] = [];
  metadataList: any[] = [];

  async ngOnInit(): Promise<void> {

    this.loadThumbnails();
    this.metadataList = await this.galleryService.loadMetadata();
    this.metadataList.map(file => {
      file.filename = this.galleryService.shortTitle(file.filename);
    });
  }

  private loadThumbnails(): void {
    this.galleryService.loadAllThumbsFilenames().pipe(
      switchMap(filenames => {
        const blobObservables = filenames.map(file =>
          this.galleryService.getThumbBlob(file)
        );
        return forkJoin(blobObservables);
      })
    ).subscribe(blobs => {
      this.thumbs = blobs.map(blob => URL.createObjectURL(blob));
    });
  };
}
