import { selectFavorites } from './../../ngrx/user.reducer';
import { CatalogService } from './../../services/catalog.service';
import { addFavorite, deleteFavorite } from './../../ngrx/user.actions';
import { BrowserCheckService } from './../../services/browser-check.service';
import { addProduct } from './../../ngrx/cart.actions';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductModel } from './../../models/product.model';
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-popular-items-bar',
  templateUrl: './popular-items-bar.component.html',
  styleUrls: ['./popular-items-bar.component.scss'],
})
export class PopularItemsBarComponent implements OnInit, OnDestroy {
  isSlim: BehaviorSubject<boolean>;
  codelist: Array<string> = [
    '20058-0050-03',
    '20068-0050-03',
    '20058-0010-03',
    '20068-0010-03',
    '20058-0200-03',
    '20068-0200-03',
  ];
  popularItems: Observable<ProductModel[]>;
  favorites: Observable<[string]>;

  badgeSubscriptions: Array<Subscription> = [];

  addToCart(product: ProductModel) {
    this.store.dispatch(addProduct({ product, count: 1 }));
    this.openSnackBar(product);
  }

  addToFavorites(product: ProductModel): void {
    this.store.dispatch(addFavorite({ code: product.code }));
    this._snackBar.open(`${product.name} ${product.pack}л добавлен в избранное`, '', {
      duration: 2000,
    });
  }

  removeFromFavorites(product: ProductModel): void {
    this.store.dispatch(deleteFavorite({ code: product.code }));
    this._snackBar.open(`${product.name} ${product.pack}л удален из избранного`, '', {
      duration: 2000,
    });
  }

  openSnackBar(item: ProductModel) {
    this._snackBar.open(`${item.name} ${item.pack}л добавлен в корзину`, '', {
      duration: 2000,
    });
  }

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store,
    private browserCheckService: BrowserCheckService,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.popularItems = this.catalogService.getCatalogSampledCodes(this.codelist);
    this.favorites = this.store.select(selectFavorites);

    this.isSlim = this.browserCheckService.isSlim();
  }

  ngOnDestroy(): void {
    for (const sub of this.badgeSubscriptions) {
      sub.unsubscribe();
    }
  }
}
