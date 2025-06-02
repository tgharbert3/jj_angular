import { Component, inject, OnInit } from '@angular/core';
import { GalleryService, thumb } from './services/gallery.service';
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

  thumbs$!: Observable<thumb[]>;

  ngOnInit(): void {
    this.thumbs$ = this.galleryService.getThumbs();
  }

}
