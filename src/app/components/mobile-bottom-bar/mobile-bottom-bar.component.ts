import { Observable } from 'rxjs';
import { selectCount } from './../../ngrx/cart.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-bottom-bar',
  templateUrl: './mobile-bottom-bar.component.html',
  styleUrls: ['./mobile-bottom-bar.component.scss']
})
export class MobileBottomBarComponent implements OnInit {
  additionalIsOpen = false;
  additionIsLK = false;
  totalCount: Observable<number>;

  additionBlockChange(): void {
    this.additionalIsOpen = !this.additionalIsOpen
  }

  lkChange(): void {
    this.additionBlockChange()
    this.additionIsLK = !this.additionIsLK;
  }

  isHome(url: string): boolean {
    if(url === '/') {
      return this.router.url === url
    } else {
      return this.router.url.includes(url);
    }
  }

  closeAdditionBlock(): void {
    this.additionalIsOpen = false;
    this.additionIsLK = false;
  }

  navigateTo(route: string): void {
    this.additionalIsOpen = false;
    this.additionIsLK = false;
    this.router.navigate([route])
  }


  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.totalCount = this.store.select(selectCount);
  }

}
