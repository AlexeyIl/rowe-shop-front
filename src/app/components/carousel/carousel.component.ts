import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {
  images = [
    'assets/carousel/1-1.jpg',
    'assets/carousel/1-2.jpg',
    'assets/carousel/1-3.jpg'
  ]

  carouselBanner: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, xl:1, all: 0 },
    slide: 1,
    speed: 400,
    interval: {
      timing: 3000,
      initialDelay: 1000
    },
    point: {
      visible: true
    },
    load: 2,
    loop: true,
    touch: true
  };
}
