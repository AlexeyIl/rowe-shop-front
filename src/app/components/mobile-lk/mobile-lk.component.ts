import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-lk',
  templateUrl: './mobile-lk.component.html',
  styleUrls: ['./mobile-lk.component.scss']
})
export class MobileLkComponent implements OnInit {
  @Output() closeEmitter: EventEmitter<any> = new EventEmitter()

  currentTemplate: 'main' | 'orders-history' | 'order' | 'personal' = 'main';

  changeTempalte(template: 'main' | 'orders-history' | 'order' | 'personal'): void {
    this.currentTemplate = template
  }

  logout(): void {
    this.closeEmitter.emit();
  }

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
