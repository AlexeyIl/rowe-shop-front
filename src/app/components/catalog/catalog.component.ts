import { BrowserCheckService } from './../../services/browser-check.service';
import { PathBarInterface } from './../path-bar/path-bar.component';
import { addFavorite } from './../../ngrx/user.actions';
import { selectFavorites } from './../../ngrx/user.reducer';
import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { ProductModel } from '../../models/product.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catalogList,
} from '../../data/catalog-list';
import { FilterListModel } from '../../models/filte-list.model';
import { FilterCatalogModel } from 'src/app/models/filter-catalog.model';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addProduct } from '../../ngrx/cart.actions';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { deleteFavorite } from 'src/app/ngrx/user.actions';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  catalogList = catalogList;
  filterList: Observable<FilterListModel>;
  catalog: Observable<ProductModel[]>;
  favorites: Observable<[string]>;
  toShow = 20;
  currentCategory: string;
  currentSort: SortListInterface = {serverName: 'quantity', name: 'По наличию', descending: false};
  saePicked: string[] = [];
  packPicked: number[] = [];
  isBrowser;
  mobileFilterSettingsIsOpen = false;
  isSlim: Observable<boolean>;
  path: PathBarInterface[] = [{name: 'Каталог', link: 'catalog'}];
  sortList: SortListInterface[] = [
    {serverName: 'ABC', name: 'Сначала популярные', descending: true},
    {serverName: 'pack', name: 'По объему (по возрастанию)', descending: true},
    {serverName: 'pack', name: 'По объему (по убыванию)', descending: false},
    {serverName: 'price', name: 'По цене (по возрастанию)', descending: true},
    {serverName: 'price', name: 'По цене (по убыванию)', descending: false},
    {serverName: 'quantity', name: 'По наличию', descending: false}];

  addToCart(product: ProductModel): void {
    this.store.dispatch(addProduct({ product, count: 1 }));
    this.openSnackBar(product);
  }

  addToFavorites(product: ProductModel): void {
    this.store.dispatch(addFavorite({code: product.code}));
    this._snackBar.open(`${product.name} ${product.pack}л добавлен в избранное`, '', {
      duration: 2000,
    });
  }

  removeFromFavorites(product: ProductModel): void {
    this.store.dispatch(deleteFavorite({code: product.code}));
    this._snackBar.open(`${product.name} ${product.pack}л удален из избранного`, '', {
      duration: 2000,
    });
  }

  mobileFilterChange(): void {
    this.mobileFilterSettingsIsOpen = !this.mobileFilterSettingsIsOpen;
  }

  openSnackBar(item: ProductModel) {
    this._snackBar.open(`${item.name} ${item.pack}л добавлен в корзину`, '', {
      duration: 2000,
    });
  }
  
  changeCategory(link: string): void {
    this.saePicked = [];
    this.packPicked = [];    
    if(link === 'all') {
      this.router.navigate(['catalog']);
    } else {
      this.router.navigate(['catalog'], {queryParams: {category: link}});
    }
  }

  changerSort(sortPoll: SortListInterface): void {
    this.currentSort = sortPoll;
    this.catalog = this.catalogService.getCatalog(new FilterCatalogModel({
      category: this.currentCategory ? [this.currentCategory] : undefined,
      pack: this.packPicked.length === 0 ? undefined : this.packPicked,
      sae: this.saePicked.length === 0 ? undefined : this.saePicked,
      sortPoll: this.currentSort.serverName,
      descending: this.currentSort.descending
    }));
  }

  saeCheckbox(e: any, sae: string): void {
    const i = this.saePicked.indexOf(sae)
    if(e.currentTarget.checked && i === -1) {
      this.saePicked.push(sae)
    } else {
      this.saePicked.splice(i, 1);
    }
    this.catalog = this.catalogService.getCatalog(new FilterCatalogModel({
      category: [this.currentCategory],
      pack: this.packPicked.length === 0 ? undefined : this.packPicked,
      sae: this.saePicked.length === 0 ? undefined : this.saePicked,
      sortPoll: this.currentSort.serverName,
      descending: this.currentSort.descending
    }));
  }

  packCheckbox(e: any, pack: string): void {
    const i = this.packPicked.indexOf(+pack);
    if(e.currentTarget.checked && i === -1) {
      this.packPicked.push(+pack)
    } else {
      this.packPicked.splice(i, 1);
    }
    this.catalog = this.catalogService.getCatalog(new FilterCatalogModel({
      category: [this.currentCategory],
      pack: this.packPicked.length === 0 ? undefined : this.packPicked,
      sae: this.saePicked.length === 0 ? undefined : this.saePicked,
      sortPoll: this.currentSort.serverName,
      descending: this.currentSort.descending
    }));
  }


  start(vl) {
    this.catalog = this.catalogService.getCatalog(vl);
    this.filterList = this.catalogService.getFilterListFromServer(Array.isArray(vl.category) ? vl.category[0] : vl.category);
    this.setToShowToDefault();
  }

  setToShowToDefault(): void {
    this.toShow = 20;
  }

  loadMore(): void {
    this.toShow += 20;
  }

  clearFilter(): void {
    this.router.navigate(['catalog']);
  }
  
  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId,
    private router: Router,
    private _snackBar: MatSnackBar,
    private browserService: BrowserCheckService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.favorites = this.store.select(selectFavorites);
    this.isSlim = this.browserService.isSlim();

    this.route.queryParams
      .pipe(
        tap((vl) => {
          if (vl.category) {
            const path = this.catalogList.find((item) => item.link === (Array.isArray(vl.category) ? vl.category[0] : vl.category))
            this.path = [
              {name: 'Каталог', link: '/catalog'},
              {name: path.name, link: `/catalog`, queryParams: {category: path.link}}
            ];
          } else {
            this.path = [{name: 'Каталог', link: 'catalog'}];
          }
        }),
        tap(vl => this.currentCategory = vl.category),
        tap(vl => this.start(vl)),
      )
      .subscribe();
  }
}

export interface SortListInterface {
  name: string;
  serverName: string;
  descending: boolean;
}