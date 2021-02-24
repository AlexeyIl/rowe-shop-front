import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-podbor',
  templateUrl: './podbor.component.html',
  styleUrls: ['./podbor.component.scss'],
})
export class PodborComponent implements AfterViewInit {
  path = [{name: 'Подбор масла', link: '/podbor'}];
  constructor() {}

  ngAfterViewInit() {}
}
