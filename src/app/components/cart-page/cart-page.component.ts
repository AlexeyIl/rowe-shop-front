import { PathBarInterface } from './../path-bar/path-bar.component';
import { selectFavorites } from './../../ngrx/user.reducer';
import { addFavorite, deleteFavorite } from './../../ngrx/user.actions';
import { selectCount } from 'src/app/ngrx/cart.reducer';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CartItem, selectSum, selectCart } from '../../ngrx/cart.reducer';
import { Observable } from 'rxjs';
import {
  deleteProduct,
  addProduct,
  removeProduct,
} from '../../ngrx/cart.actions';
import { BrowserCheckService } from '../../services/browser-check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cart: Observable<CartItem[]>;
  sum: Observable<number>;
  totalQuantity: Observable<number>;
  isSlim: Observable<boolean>;
  path: PathBarInterface[] = [{name: 'Корзина', link: '/cart'}];
  favorites: Observable<[string]>;

  checkout() {
    this.router.navigate(['checkout']);
  }

  delete(item: CartItem): void {
    this.store.dispatch(deleteProduct({ product: item.product }));
  }

  add(item: CartItem): void {
    this.store.dispatch(addProduct({ product: item.product, count: 1 }));
  }

  remove(item: CartItem): void {
    this.store.dispatch(removeProduct({ product: item.product, count: 1 }));
  }

  addToFavorites(item: CartItem): void {
    this.store.dispatch(addFavorite({code: item.product.code}))
  }

  removeFromFavorites(item: CartItem): void {
    this.store.dispatch(deleteFavorite({code: item.product.code}))
  }

  constructor(
    private store: Store,
    private browserCheckService: BrowserCheckService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart = this.getStore();
    this.sum = this.store.select(selectSum);
    this.isSlim = this.browserCheckService.isSlim();
    this.totalQuantity = this.store.select(selectCount);
    this.favorites = this.store.select(selectFavorites);
  }

  getStore(): Observable<CartItem[]> {
    return this.store.pipe(select(selectCart));
  }
}
