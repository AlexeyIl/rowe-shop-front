import { loadFavorites } from './../ngrx/user.actions';
import { BrowserCheckService } from 'src/app/services/browser-check.service';
import { Injectable } from '@angular/core';
import { GetNoLoggedUserGQL, UpdateNotUserFavoritesGQL } from './GQL/not-logged-user.gql';
import { map, filter, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { loadCart, cleanCart } from '../ngrx/cart.actions';
import { UpdateNotLoggedCartGQL } from './GQL/cart.gql';
import { NoLoggedUserModel } from '../models/no-logged-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoLoggedUserService {
  constructor(
    private cookieService: CookieService,
    private getNoLoggedUserGQL: GetNoLoggedUserGQL,
    private store: Store,
    private updateCartGQL: UpdateNotLoggedCartGQL,
    private browserCheckService: BrowserCheckService,
    private updateNotUserFavoritesGQL: UpdateNotUserFavoritesGQL
  ) {}

  startNoLogged(): void {
    this.getToken().subscribe();
  }

  private getNoLoggedUser(token: string): Observable<NoLoggedUserModel> {
    return this.getNoLoggedUserGQL
      .fetch({ token })
      .pipe(map((vl) => vl.data.getNotLoggedUser));
  }

  private get checkNoLoggedUserToken(): string {
    return this.noLoggedToken ? this.noLoggedToken : '';
  }

  private getToken(): Observable<void> {
    return this.getNoLoggedUser(this.checkNoLoggedUserToken).pipe(
      filter((vl) => vl !== null),
      tap(vl => this.store.dispatch(loadFavorites({codes: vl.favorites}))),
      map((vl) => {
        this.cookieService.set('nlu-token', vl.token);
        vl.cart
          ? this.store.dispatch(loadCart({ cart: vl.cart }))
          : this.store.dispatch(cleanCart());
      })
    );
  }

  updateCart(user: NoLoggedUserModel) {
    return this.updateCartGQL.mutate(user);
  }

  updateFavorites(user: NoLoggedUserModel) {
    return this.updateNotUserFavoritesGQL.mutate({token: user.token, favorites: user.favorites});
  }

  get noLoggedToken(): string {
    if (this.browserCheckService.isBrowser) {
      return this.cookieService.get('nlu-token');
    } else {
      return 'server';
    }
  }
}
