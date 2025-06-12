import { Component, inject, OnInit } from '@angular/core';
import { GalleryService, thumbFilePath } from './services/gallery.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {

  private galleryService = inject(GalleryService);

  pageNumber = 1;
  thumbs$!: Observable<thumbFilePath[]>;

  ngOnInit(): void {
    try {
      this.thumbs$ = this.galleryService.loadThumbFilenamesByPage(this.pageNumber);
    } catch (error) {
      return console.error(`Error during image loading`, error);
    }

  }

  increasePage(): void {

  }

}
