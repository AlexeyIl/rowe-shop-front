import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dostavka',
  templateUrl: './dostavka.component.html',
  styleUrls: ['./dostavka.component.scss'],
})
export class DostavkaComponent implements OnInit {
  path = [{name: 'Доставка', link: '/dostavka'}];
  constructor() {}

  ngOnInit(): void {}
}
