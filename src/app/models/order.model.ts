import { CartItem } from '../ngrx/cart.reducer';
export class OrderModel {
  name: string;
  phone: string;
  delivery: string;
  adress?: string;
  cart: CartItem[];
  number?: number;
  mail: string;
  personal: boolean;
  payment: string;
  date?: string;
  constructor(form: OrderModel) {
    this.name = form.name;
    this.phone = form.phone;
    this.delivery = form.delivery;
    if (form.adress) {
      this.adress = form.adress;
    }
    this.cart = form.cart;
    this.mail = form.mail;
    this.personal = form.personal;
    this.payment = form.payment;
    this.cart = this.cart;
  }
}
