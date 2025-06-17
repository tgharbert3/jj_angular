import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private imageService: ImageService) { }

  shortFile: string = "";
  metadataList: any[] = [];
  currentImageId: number = 0;
  imageSrc: any;
  caption: string = '';
  details: string = '';
  price: number = 0;

  async ngOnInit(): Promise<void> {

    this.route.queryParams.subscribe(params => {
      const shortFileName = params['picture'];
      const image_id = params['image_id']
      this.shortFile = shortFileName;
      this.currentImageId = image_id;
    });

    const metadata = await firstValueFrom(this.imageService.getAllImagesMetaData());
    this.metadataList = metadata;

    metadata.map(file => {
      if (file.image_id == this.currentImageId) {
        console.log(this.currentImageId);
        this.caption = file.caption;
        this.details = file.details;
        this.price = file.price;
      }
    })

    this.imageService.getImageBlob(this.currentImageId).subscribe(imageBlob => {
      this.imageSrc = URL.createObjectURL(imageBlob)
    });
  }
}
