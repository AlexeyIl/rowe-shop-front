import { BrowserCheckService } from './../../services/browser-check.service';
import { deleteFavorite } from 'src/app/ngrx/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { ProductModel } from './../../models/product.model';
import { CatalogService } from './../../services/catalog.service';
import { selectFavorites } from './../../ngrx/user.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  isSlim: Observable<boolean>;
  favorites: Observable<ProductModel[]>;

  removeFromFavorites(product: ProductModel): void {
    this.store.dispatch(deleteFavorite({code: product.code}));
    this._snackBar.open(`${product.name} ${product.pack}л удален из избранного`, '', {
      duration: 2000,
    });
  }


  constructor(
    private store: Store,
    private catalog: CatalogService,
    private _snackBar: MatSnackBar,
    private browserService: BrowserCheckService
  ) { }

  ngOnInit(): void {
    this.isSlim = this.browserService.isSlim();
    this.favorites = this.store.select(selectFavorites).pipe(
      switchMap(vl => this.catalog.getCatalogSampledCodes(vl))
    )
  }

}
