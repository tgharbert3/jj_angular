import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
  ) { }

  shortFile: string = "";
  metadataList: any[] = [];
  currentImageId: number = 0;
  imageSrc: any;
  caption: string = '';
  details: string = '';
  price: number = 0;
  isAuthenticated$!: Observable<boolean>;



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
        this.caption = file.caption;
        this.details = file.details;
        this.price = file.price;
      }
    })

    this.imageService.getImageBlob(this.currentImageId).subscribe(imageBlob => {
      this.imageSrc = URL.createObjectURL(imageBlob)
    });

    this.isAuthenticated$ = this.authService.isAuthenticated$;
  };

  public addToCart() {
    this.cartService.addToCart(this.currentImageId, 1, this.caption, this.price).subscribe({
      next: (res) => {
        console.log('Item added to cart:', res);
        this.router.navigate(['/view_cart']);
      },
      error: (err) => {
        console.error('Failed to add to cart:', err);
      }
    });
  }

  public navigateToCart() {
    this.router.navigate(['/view_cart']);
  }
}
