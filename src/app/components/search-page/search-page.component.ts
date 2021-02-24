import { PathBarInterface } from './../path-bar/path-bar.component';
import { addFavorite } from './../../ngrx/user.actions';
import { selectFavorites } from './../../ngrx/user.reducer';
import { Store } from '@ngrx/store';
import { addProduct } from './../../ngrx/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductModel } from './../../models/product.model';
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { CatalogService } from '../../services/catalog.service';
import { Observable, Subscription } from 'rxjs';
import { deleteFavorite } from 'src/app/ngrx/user.actions';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  path: PathBarInterface[] = [{name: 'Результаты поиска', link: '/search'}];
  searchResultLength: number;
  searchQuery: Observable<string>;
  badgeSubscriptions: Array<Subscription> = [];
  toShow = 20;
  showStep = 20;
  catalog: Observable<ProductModel[]>;
  favorites: Observable<[string]>;

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

  loadMore(): void {
    this.toShow += this.showStep;
  }

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private _snackBar: MatSnackBar,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((vl) => this.catalogService.getSearchList(vl.search, 650)),
        map((vl) => vl.map((v) => v.code)),
        tap((vl) => this.catalog = this.catalogService.getCatalogSampledCodes(vl)),
      ).subscribe();

    this.favorites = this.store.select(selectFavorites);
    this.searchQuery = this.route.queryParams.pipe(
      map((vl) => vl.search),
      tap(vl => this.path = [{name: 'Результаты поиска', link: '/search', queryParams: {search: vl}}])
      );
  }

  ngOnDestroy(): void {
    for (const sub of this.badgeSubscriptions) {
      sub.unsubscribe();
    }
  }
}
