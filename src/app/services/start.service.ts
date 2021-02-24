import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { NoLoggedUserService } from './no-logged-user.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { removeAll } from '../ngrx/user.actions';
import { cleanCart } from '../ngrx/cart.actions';

@Injectable({
  providedIn: 'root',
})
export class StartService {
  start() {
    if (this.isLogged) {
      this.userService.startLoggedUser()
    } else {
      this.noLoggedUserService.startNoLogged();
    }
  }

  logout(): void {
    this.router.navigate(['']);
    this.cookiesService.delete('user-token');
    this.store.dispatch(removeAll());
    this.store.dispatch(cleanCart());
    this.start();
  }

  get isLogged(): boolean {
    return this.userService.currentUserValue.token ? true : false;
  }

  constructor(
    private userService: UserService,
    private noLoggedUserService: NoLoggedUserService,
    private store: Store,
    private router: Router,
    private cookiesService: CookieService
  ) {}
}
