import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  imageSrc: any;

  constructor(private imageService: ImageService) { }


  ngOnInit(): void {
    this.imageService.getImage().subscribe(imageBlob => {
      this.imageSrc = URL.createObjectURL(imageBlob);
    })
  }
}
