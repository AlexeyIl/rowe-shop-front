import { OrderModel } from './order.model';
import { CartItem } from '../ngrx/cart.reducer';
export class UserModel {
  name?: string;
  id?: string;
  email?: string;
  phone?: string;
  adress?: string;
  orders?: OrderModel[];
  cart?: CartItem[];
  favorites?: string[];
}

export interface UpdateUserInterface {
  email?: string;
  name?: string;
  phone?: string;
  adress?: string;
  password?: string;
}
