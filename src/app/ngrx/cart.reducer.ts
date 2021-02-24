import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProductModel } from '../models/product.model';
import * as CartActions from './cart.actions';
import { createReducer, on, createSelector } from '@ngrx/store';

export interface CartItem {
  product: ProductModel;
  count: number;
}

export interface State extends EntityState<CartItem> {}

export const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>({
  selectId: (item) => item.product.code,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});

export const cartReducer = createReducer<any>(
  initialState,
  on(CartActions.addProduct, (state, { product, count }) => {
    product = cutProduct(product);
    const inCart = state.ids.includes(product.code);
    if (!inCart) {
      return adapter.addOne({ product, count }, state);
    } else {
      const newCount = state.entities[product.code].count + count;
      return adapter.updateOne(
        { id: product.code, changes: { count: newCount } },
        state
      );
    }
  }),
  on(CartActions.removeProduct, (state, { product, count }) => {
    product = cutProduct(product);
    const inCart = state.ids.includes(product.code);
    const newCount = state.entities[product.code].count - count;
    if (inCart && newCount > 0) {
      return adapter.updateOne(
        { id: product.code, changes: { count: newCount } },
        state
      );
    }
    if (inCart && newCount < 1) {
      return adapter.updateOne({ id: product.code, changes: {} }, state);
    }
  }),
  on(CartActions.deleteProduct, (state, { product }) => {
    product = cutProduct(product);
    return adapter.removeOne(product.code, state);
  }),
  on(CartActions.loadCart, (state, { cart }) => {
    cart = cutCart(cart);
    return adapter.setAll(cart, state);
  }),
  on(CartActions.cleanCart, (state) => {
    return adapter.removeAll(state);
  })
);

export const getSelectedUserId = (state: State) => state.ids;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getEntities = (state: any) => state.Cart.entities;

export const selectSum = createSelector(getEntities, (state) => {
  let sum = 0;
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      sum += state[key].count * state[key].product.price;
    }
  }
  return sum;
});

export const selectCount = createSelector(getEntities, (state) => {
  let count = 0;
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      count += state[key].count;
    }
  }
  return count;
});

export const selectCart = createSelector(getEntities, (state) => {
  let arr = [];
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      arr.push(state[key]);
    }
  }
  return arr;
});

const cutProduct = (product: ProductModel): ProductModel => {
  const newProduct = {
    code: product.code,
    pack: product.pack,
    price: product.price,
    name: product.name,
    img: product.img
  };
  return newProduct;
};

const cutCart = (cart: CartItem[]): CartItem[] => {
  if (cart) {
    const newCart = cart.map((vl) => {
      const obj: CartItem = {
        count: vl.count,
        product: {
          code: vl.product.code,
          pack: vl.product.pack,
          price: vl.product.price,
          name: vl.product.name,
          img: vl.product.img
        },
      };
      return obj;
    });
    return newCart;
  }
  return cart;
};
