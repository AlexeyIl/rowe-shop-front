import { CartItem } from '../ngrx/cart.reducer';
export class NoLoggedUserModel {
  token: string;
  favorites?: [string];
  cart?: [CartItem];
}
