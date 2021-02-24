import {Mutation, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';


import { CartItem } from '../../ngrx/cart.reducer';


@Injectable({
    providedIn: 'root'
})
export class UpdateNotLoggedCartGQL extends Mutation<ResponseUpdateCart> {
    document = gql`
      mutation updateCart($token: String!, $cart: [CartItemARGS]){
          updateCart(token: $token, cart: $cart){
              token
          }
      }
    `;
  }

export type ResponseUpdateCart = {
    getUser: {
        token: string,
        cart?: CartItem[]
    }
}

@Injectable({
    providedIn: 'root'
})
export class UpdateCartUserGQL extends Mutation<ResponseUpdateCartUser> {
    document = gql `
    mutation updateCartUser($cart: [CartItemARGS]){
        updateCartUser(cart: $cart){
            cart {
                count
                product {
                    code
                    name
                    price
                    pack
                }
            }
        }
    }
    `
}

export type ResponseUpdateCartUser = {
    updateCartUser: {
        email: string,
        cart: CartItem[]
    }
}
