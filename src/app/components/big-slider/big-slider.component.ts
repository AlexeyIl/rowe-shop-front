import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BrowserCheckService } from 'src/app/services/browser-check.service';

@Component({
  selector: 'app-big-slider',
  templateUrl: './big-slider.component.html',
  styleUrls: ['./big-slider.component.scss']
})
export class BigSliderComponent implements OnInit {
  isSlim: BehaviorSubject<boolean>;
  slides = [
    { src: 'assets/carousel/1.jpg' },
    { src: 'assets/carousel/2.jpg' },
    { src: 'assets/carousel/3.jpg' },
  ];
  constructor(
    private browserCheckService: BrowserCheckService
  ) { }

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
  }

}
