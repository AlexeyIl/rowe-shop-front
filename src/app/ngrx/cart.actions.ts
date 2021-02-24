import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../models/product.model';
import { CartItem } from './cart.reducer';

export const addProduct = createAction(
  '[Cart Page] Add Product',
  props<{ product: ProductModel; count: number }>()
);
export const removeProduct = createAction(
  '[Cart Page] Remove Product by count',
  props<{ product: ProductModel; count: number }>()
);
export const deleteProduct = createAction(
  'Cart Page Delete Product',
  props<{ product: ProductModel }>()
);
export const loadCart = createAction(
  '[Start Page] Load Cart From Server',
  props<{ cart: CartItem[] }>()
);
export const cleanCart = createAction('[Cart Page] Remove All Items');
export const updateCartSuccess = createAction('Update cart Success');