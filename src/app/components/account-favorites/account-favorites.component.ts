import { ProductModel } from './../../models/product.model';
import { CatalogService } from './../../services/catalog.service';
import { selectFavorites } from './../../ngrx/user.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { deleteFavorite } from 'src/app/ngrx/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-favorites',
  templateUrl: './account-favorites.component.html',
  styleUrls: ['./account-favorites.component.scss']
})
export class AccountFavoritesComponent implements OnInit {
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
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.favorites = this.store.select(selectFavorites).pipe(
      switchMap(vl => this.catalog.getCatalogSampledCodes(vl))
    )
  }

}
