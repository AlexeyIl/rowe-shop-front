import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCount } from 'src/app/ngrx/cart.reducer';
import { selectSum } from '../../ngrx/cart.reducer';

@Component({
  selector: 'app-cart-badge',
  templateUrl: './cart-badge.component.html',
  styleUrls: ['./cart-badge.component.scss'],
})
export class CartBadgeComponent implements OnInit {
  totalCount: Observable<number>;
  totalSum: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.totalCount = this.store.select(selectCount);
    this.totalSum = this.store.select(selectSum);
  }
}
