import { Observable } from 'rxjs';
import { OrderService } from './../../services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';

@Component({
  selector: 'app-mobile-orders',
  templateUrl: './mobile-orders.component.html',
  styleUrls: ['./mobile-orders.component.scss']
})
export class MobileOrdersComponent implements OnInit {
  orders: Observable<OrderModel[]>;

  getDate(ms: string) {
    return this.orderService.getDate(ms);
  }

  getSum(order: OrderModel) {
    return this.orderService.getSum(order);
  }

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orders = this.orderService.getUserOrdersList()
  }

}
