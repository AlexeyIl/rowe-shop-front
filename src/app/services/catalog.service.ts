import { Injectable } from '@angular/core';
import { FilterCatalogModel } from '../models/filter-catalog.model';
import { GetCatalogGQL, GetPacksGQL, GetCatalogSampledCodesGQL } from './GQL/catalog.gql';
import { map } from 'rxjs/operators';
import { ProductModel } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { GetSearchListGQL } from './GQL/search-list.gql';
import { SearchListItem } from '../models/search-list-teim.model';
import { FilterListModel } from '../models/filte-list.model';
import { GetFilterListGQL } from './GQL/filter-list.gql';
import { GetProductInfoGQL } from './GQL/catalog.gql';
import { catalogList, CatalogListItemInterface } from './data/catalog-list';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  filterList: FilterListModel;

  getCatalog(filter?: FilterCatalogModel): Observable<ProductModel[]> {
    return this.getCatalogGQL
      .fetch(filter ? filter : {})
      .pipe(map((vl) => vl.data.getCatalog));
  }

  getProductInfo(code): Observable<ProductModel[]> {
    return this.getProductInfoGQL
      .fetch({ code })
      .pipe(
        map((vl) => (vl.data.getCatalog.length > 0 ? vl.data.getCatalog : null))
      );
  }

  getSearchList(
    input: string,
    length?: number
  ): Observable<SearchListItem[]> | Observable<null> {
    if (input === '') {
      return of(null);
    } else {
      return this.getSearchListGQL
        .fetch({ input, length })
        .pipe(map((vl) => vl.data.getSearchList));
    }
  }

  getCatalogSampledCodes(codes: string[]): Observable<ProductModel[]> {
    return this.getCatalogSampledCodesGQL.fetch({codes}).pipe(
      map(vl => vl.data.getCatalogSampledCodes)
    );
  }

  getFilterListFromServer(input: string): Observable<FilterListModel> {
    return this.getFilterListGQL
      .fetch({ category: input })
      .pipe(map((vl) => vl.data.getFilterList));
  }

  getCategoryItem(input: string): CatalogListItemInterface | null {
    let obj = catalogList.find((vl) => vl.link === input);
    return obj ? obj : null;
  }

  getCategoryList(): CatalogListItemInterface[] {
    return catalogList;
  }

  getPacks(code: string): Observable<[ProductModel]> {
    return this.getPacksGQL
      .fetch({ group: code.slice(0, 5) })
      .pipe(map((vl) => vl.data.getCatalog));
  }

  constructor(
    private getCatalogGQL: GetCatalogGQL,
    private getSearchListGQL: GetSearchListGQL,
    private getFilterListGQL: GetFilterListGQL,
    private getProductInfoGQL: GetProductInfoGQL,
    private getPacksGQL: GetPacksGQL,
    private getCatalogSampledCodesGQL: GetCatalogSampledCodesGQL
  ) {}
}
