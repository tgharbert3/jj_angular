import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ImageService, ImageMetadata } from '../../services/image.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  imageSrc: any;
  metadataList: ImageMetadata[] = [];
  currentMetadata: ImageMetadata | undefined;

  constructor(private imageService: ImageService) { }


  async ngOnInit(): Promise<void> {

    try {
      const metadata = await firstValueFrom(this.imageService.getAllImagesMetaData());
      this.metadataList = metadata;

      const randomIndex = Math.floor(Math.random() * this.metadataList.length);
      console.log(randomIndex);
      this.currentMetadata = this.metadataList[randomIndex];

      if (this.currentMetadata) {
        this.imageService.getImageBlob(this.currentMetadata.image_id).subscribe(imageBlob => {
          this.imageSrc = URL.createObjectURL(imageBlob);
        })
      }
    } catch (error) {
      console.error(`Error during image loading`, error);
    }
  }
}
