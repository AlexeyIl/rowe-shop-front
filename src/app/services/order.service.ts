import { Injectable } from '@angular/core';
import {
  SubmitOrderGQL,
  SubmitUserOrderGQL,
  GetUserOrdersListGQL,
  GetUserOrderGQL,
} from './GQL/order.gql';
import { OrderModel } from '../models/order.model';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private submitOrderGQL: SubmitOrderGQL,
    private submitUserOrderGQL: SubmitUserOrderGQL,
    private getUserOrdersListGQL: GetUserOrdersListGQL,
    private getUserOrderGQL: GetUserOrderGQL
  ) {}

  submitOrder(order: OrderModel) {
    return this.submitOrderGQL
      .mutate(order)
      .pipe(map((vl) => vl.data.addOrder));
  }

  submitUserOrder(order: OrderModel) {
    return this.submitUserOrderGQL
      .mutate(order)
      .pipe(map((vl) => vl.data.addUserOrder));
  }

  getUserOrdersList(): Observable<OrderModel[]> {
    return from(this.getUserOrdersListGQL.watch().refetch()).pipe(
      map((vl) => vl.data.getUserOrdersList)
    );
  }

  getUserOrder(orderId: number): Observable<OrderModel> {
    return this.getUserOrderGQL
      .fetch({ number: orderId })
      .pipe(map((vl) => vl.data.getUserOrder));
  }

  getDate(ms: string) {
    const date = new Date(+ms).toLocaleDateString('ru-RU');
    return date;
  }

  getSum(order: OrderModel) {
    const sum = order.cart.map((vl) => vl.count * vl.product.price);
    return sum.reduce((acc, sum) => acc + sum);
  }
}
