import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  
  images: string[] = [
    'assets/images/slide1.png',
    'assets/images/slide2.jpg',
    //'assets/images/slide3.jpeg',
    'assets/images/slide4.jpeg',
    //'assets/images/slide5.jpeg',
    //'assets/images/slide6.jpeg',
    //'assets/images/slide7.jpeg',
    'assets/images/slide8.jpeg',
    //'assets/images/slide9.jpeg',
    'assets/images/slide10.jpeg',
  ];

  index: number = 0;
  intervalId: any; // Pour stocker l'identifiant de l'intervalle

  ngOnInit(): void {
    // Défilement automatique des images toutes les 3 secondes
    this.intervalId = setInterval(() => this.nextImage(), 3000);
  }

  ngOnDestroy(): void {
    // Nettoyer l'intervalle lorsque le composant est détruit
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextImage() {
    this.index = (this.index + 1) % this.images.length;
  }

  prevImage() {
    this.index = (this.index - 1 + this.images.length) % this.images.length;
  }
}
