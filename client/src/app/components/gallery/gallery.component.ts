import { Component, inject, OnInit, } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ImageService } from '../../services/image.service';


@Component({
  selector: 'app-gallery',
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {

  private galleryService = inject(GalleryService);
  private imageService = inject(ImageService);

  constructor(private route: ActivatedRoute) { }

  NUM_IMAGES = 6;
  thumbs: any[] = [];
  currentImage: any;
  pageNumber = 1;
  metadataList: any[] = [];
  imageId: number = 1;
  totalPages: number = 0;
  startImg: number = 1;
  offset: number = this.startImg - 1;
  endImg = 6;


  async ngOnInit(): Promise<void> {
    try {
      this.loadThumbnails();

      this.metadataList = await this.galleryService.loadMetadata();
      this.metadataList.map(file => {
        file.caption = this.galleryService.shortTitle(file.caption);
      })
      this.totalPages = Math.ceil(this.metadataList.length / 6);

      this.route.queryParams.subscribe(params => {
        const image_id = params['image_id'];
        this.imageId = parseInt(image_id, 10);
        this.getImageFromImageService(image_id);
      });

    } catch (error) {
      return console.error(`Error during image loading`, error);
    }
  }

  private async getImageFromImageService(image_id: string) {
    const imageBlob = await firstValueFrom(this.imageService.getImageBlob(parseInt(image_id, 10)));
    this.currentImage = URL.createObjectURL(imageBlob);
  }

  private loadThumbnails(): void {
    this.galleryService.loadThumbFilenamesByPage(this.pageNumber).pipe(
      switchMap(filenames => {
        const blobObservables = filenames.map(file =>
          this.galleryService.getThumbBlob(file)
        );
        return forkJoin(blobObservables);
      })
    ).subscribe(blobs => {
      this.thumbs = blobs.map(blob => URL.createObjectURL(blob));
    });
  }

  private updateNewStartImage() {
    this.startImg = (this.pageNumber - 1) * this.NUM_IMAGES + 1
  };

  private updateNewOffset() {
    this.offset = this.startImg - 1;
  };

  public updateNewEndImage() {
    if (this.startImg + this.NUM_IMAGES > this.metadataList.length) {
      this.endImg = this.metadataList.length;
    } else {
      this.endImg = this.offset + this.NUM_IMAGES;
    }
  };

  public increasePage(): void {
    this.pageNumber++;
    this.updateNewStartImage();
    this.updateNewOffset();
    this.updateNewEndImage();
    this.loadThumbnails();
  }

  public decreasePage(): void {
    this.pageNumber--;
    this.updateNewStartImage();
    this.updateNewOffset();
    this.updateNewEndImage();
    this.loadThumbnails();
  }

}
