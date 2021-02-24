import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opt-client-page',
  templateUrl: './opt-client-page.component.html',
  styleUrls: ['./opt-client-page.component.scss']
})
export class OptClientPageComponent implements OnInit {
  path = [{name: 'Оптовым покупателям', link: '/opt'}];
  optReqModalIsOpen = false;

  optReqModal(): void {
    this.optReqModalIsOpen = !this.optReqModalIsOpen;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
