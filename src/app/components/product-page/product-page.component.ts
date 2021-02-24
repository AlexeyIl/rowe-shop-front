import { PathBarInterface } from './../path-bar/path-bar.component';
import { selectFavorites } from './../../ngrx/user.reducer';
import { addFavorite, deleteFavorite } from './../../ngrx/user.actions';
import { BrowserCheckService } from 'src/app/services/browser-check.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { CatalogListItemInterface } from '../../services/data/catalog-list';
import { Store } from '@ngrx/store';
import { addProduct } from '../../ngrx/cart.actions';
import { MetaService } from '../../services/meta.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  isSlim: Observable<boolean>;
  product: ProductModel;
  isLoading = true;
  category: CatalogListItemInterface;
  count = 1;
  packsList: Observable<ProductModel[]>;
  path: PathBarInterface[];
  favorites: Observable<[string]>;

  addToCart(product: ProductModel, count: number): void {
    if (this.isNumeric(count) && count > 0) {
      this.store.dispatch(addProduct({ product, count: +count }));
      this.openSnackBar(product);
    } else {
      this.count = 1;
    }
  }

  addOne(): void {
    if (this.isNumeric(this.count)) {
      this.count += 1;
    } else {
      this.count = 1;
    }
  }

  addToFavorites(): void {
    this.store.dispatch(addFavorite({ code: this.product.code }));
    this._snackBar.open(`${this.product.name} ${this.product.pack}л добавлен в избранное`, '', {
      duration: 2000,
    });
  }

  removeFromFavorites(): void {
    this.store.dispatch(deleteFavorite({ code: this.product.code }));
    this._snackBar.open(`${this.product.name} ${this.product.pack}л удален из избранного`, '', {
      duration: 2000,
    });
  }

  helpRequest(): void {
    console.log('Оставить заявку');
  }

  removeOne(): void {
    if (this.isNumeric(this.count) && this.count > 1) {
      this.count -= 1;
    } else {
      this.count = 1;
    }
  }

  start(vl: ProductModel): void {
    this.product = vl;
    this.path = [{
      name: 'Каталог', link: '/catalog'
    }, {
      name: vl.name, link: `/catalog/${vl.code}`
    }];
    this.metaService.addMetaProductPage(vl);
    this.category = this.catalogService.getCategoryItem(vl.category);
    this.packsList = this.catalogService.getPacks(vl.code);
  }

  openSnackBar(item: ProductModel): void {
    this._snackBar.open(`${item.name} ${item.pack}л добавлен в корзину`, '', {
      duration: 2000,
    });
  }

  private isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private metaService: MetaService,
    private _snackBar: MatSnackBar,
    private browserCheckService: BrowserCheckService
  ) {}

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => params.getAll('code')),
        switchMap((vl) => this.catalogService.getProductInfo(vl)),
        map((vl) => {
          if (vl === null) {
            this.router.navigate(['catalog']);
          } else {
            return vl[0];
          }
        })
      )
      .subscribe((vl) => {
        this.start(vl);        
        if (this.browserCheckService.isBrowser) {
          window.scroll(0,0);
        }
      });
    this.favorites = this.store.select(selectFavorites);
  }
}
