import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  AddUsersGQL,
  LoginUserGQL,
  TokenLoginUser,
  GetUserGQL,
  CheckIsAdminGQL,
  UpdateUserFavoritesGQL
} from './GQL/user.gql';
import { UserModel, UpdateUserInterface } from '../models/user.model';
import {
  map,
  tap,
  catchError,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from '../ngrx/cart.reducer';
import { Store } from '@ngrx/store';
import { loadCart, cleanCart } from '../ngrx/cart.actions';
import {
  VerifyEmailGQL,
  PasswordRecoveryReqGQL,
  RecoveryTokenCheckGQL,
  SetNewPassByRecoveryGQL,
  UpdateUserGQL,
} from './GQL/user.gql';
import { setUser } from '../ngrx/user.actions';
import { UpdateCartUserGQL, ResponseUpdateCartUser } from './GQL/cart.gql';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private addUserGQL: AddUsersGQL,
    private loginUserGQL: LoginUserGQL,
    private getUserGQL: GetUserGQL,
    private cookiesService: CookieService,
    private updateCartUserGQL: UpdateCartUserGQL,
    private store: Store,
    private checkIsAdminGQL: CheckIsAdminGQL,
    private verifyEmailGQL: VerifyEmailGQL,
    private passwordRecoveryReqGQL: PasswordRecoveryReqGQL,
    private recoveryTokenCheckGQL: RecoveryTokenCheckGQL,
    private setNewPassByRecoveryGQL: SetNewPassByRecoveryGQL,
    private updateUserGQL: UpdateUserGQL,
    private updateUserFavoritesGQL: UpdateUserFavoritesGQL,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  addUser(
    name: string,
    email: string,
    password: string,
    phone: string,
    cart: [CartItem],
    favorites: string[]
  ): Observable<UserModel> {
    return this.addUserGQL
      .mutate({ name, email, password, cart, phone, favorites })
      .pipe(map((vl) => vl.data.addUser));
  }

  loginUser(email: string, password: string): Observable<TokenLoginUser> {
    return this.loginUserGQL.fetch({ email, password }).pipe(
      map((vl) => vl.data.loginUser),
      tap((vl) => {
        if (vl && vl.access_token) {
          this.cookiesService.set('user-token', vl.access_token, 6205);
        }
      })
    );
  }

  getUser(): Observable<UserModel> {
    return this.getUserGQL.fetch().pipe(map((vl) => vl.data.getUser));
  }

  updateCart(cart: CartItem[]): Observable<ResponseUpdateCartUser> {
    return this.updateCartUserGQL.mutate({ cart }).pipe(map((vl) => vl.data));
  }

  get currentUserValue() {
    if (this.platformId === 'browser') {
      return { token: this.cookiesService.get('user-token') };
    } else {
      return { token: null }
    }
  }

  startLoggedUser(): void {
    this.getUser().pipe(
      tap((vl) =>
        vl.cart
          ? this.store.dispatch(loadCart({ cart: vl.cart }))
          : this.store.dispatch(cleanCart())
      ),
      tap((vl) => {
        this.store.dispatch(setUser({ user: vl }));
        this.cookiesService.delete('nlu-token');
      })
    ).subscribe();
  }

  isAdmin(): Observable<boolean> {
    return this.checkIsAdminGQL
      .fetch(
        {},
        {
          context: {
            headers: {
              Authorization: this.currentUserValue.token,
            },
          },
        }
      )
      .pipe(
        map((vl) => vl.data.checkIsAdmin),
        catchError((err) => of(false))
      );
  }

  verifyEmail(emailToken: string): Observable<UserModel | null> {
    return this.verifyEmailGQL
      .fetch({ emailToken })
      .pipe(map((vl) => vl.data.verifyEmail));
  }

  recoveryPasswordRequest(email: string): Observable<boolean> {
    return this.passwordRecoveryReqGQL
      .fetch({ email })
      .pipe(map((vl) => vl.data.passwordRecoveryReq));
  }
  checkRecoveryToken(token: string): Observable<boolean> {
    return this.recoveryTokenCheckGQL
      .fetch({ token })
      .pipe(map((vl) => vl.data.recoveryTokenCheck));
  }

  setNewPassword(password: string, token: string): Observable<boolean> {
    return this.setNewPassByRecoveryGQL
      .mutate({ password, token })
      .pipe(map((vl) => vl.data.setNewPasswordByRecovery));
  }

  updateUser(newUserInfo: UpdateUserInterface): Observable<UserModel> {
    return this.updateUserGQL
      .mutate(newUserInfo)
      .pipe(map((vl) => vl.data.updateUser));
  }

  updateUserFavorites(codes: [string]): Observable<UserModel> {
    return this.updateUserFavoritesGQL.mutate({codes}).pipe(
      map(vl => vl.data.updateUserFavorites),
    )
  }
}
