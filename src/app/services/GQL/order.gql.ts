import {Mutation, Query, gql} from 'apollo-angular';
import { Injectable } from '@angular/core';

import { OrderModel } from '../../models/order.model';


@Injectable({
    providedIn: 'root'
})
export class SubmitOrderGQL extends Mutation<ResponseOrder> {
    document = gql `
    mutation addOrder($name: String!, $phone: String!, $delivery: String!, $adress: String, $cart: [CartItemARGS!]!, $mail: String!, $personal: Boolean!, $payment: String!){
        addOrder(name: $name, phone: $phone, delivery: $delivery, adress: $adress, cart: $cart, mail: $mail, personal: $personal, payment: $payment){
            number
        }
    }
    `
}

export type ResponseOrder = {
    addOrder: OrderModel
}

@Injectable({
    providedIn: 'root'
})
export class SubmitUserOrderGQL extends Mutation<ResponseUserOrder>{
    document = gql `
    mutation addUserOrder($name: String!, $phone: String!, $delivery: String!, $adress: String, $cart: [CartItemARGS!]!, $mail: String!, $personal: Boolean!, $payment: String!){
        addUserOrder(name: $name, phone: $phone, delivery: $delivery, adress: $adress, cart: $cart, mail: $mail, personal: $personal, payment: $payment){
            number
        }
    }
    `
}

export type ResponseUserOrder = {
    addUserOrder: OrderModel
}

@Injectable({
    providedIn: 'root'
})
export class GetUserOrdersListGQL extends Query<ResponseGetUserOrdersListGQL> {
    document = gql`
    query getUserOrdersList{
        getUserOrdersList{
            date
            number
            cart{
                count
                product{
                    price
                    code
                    img
                    name
                    pack
                }
            }
        }
    }
    `
}

export type ResponseGetUserOrdersListGQL = {
    getUserOrdersList: OrderModel[]
}


@Injectable({
    providedIn: 'root'
})
export class GetUserOrderGQL extends Query<ResponseGetUserOrderGQL> {
    document = gql`
    query getUserOrder($number: Float){
        getUserOrder(number: $number){
            date
            adress
            cart{
                count
                product{
                    price
                    code
                    name
                    pack
                }
            }
            number
        }
    }
    `
}

export type ResponseGetUserOrderGQL = {
    getUserOrder: OrderModel
}




