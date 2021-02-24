import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../models/order.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { BrowserCheckService } from '../../services/browser-check.service';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss'],
})
export class AccountOrdersComponent implements OnInit {
  displayedColumns = ['no', 'date', 'number', 'sum', 'status'];
  isSlim: BehaviorSubject<boolean>;
  orders: Observable<OrderModel[]>;

  getSum(order: OrderModel) {
    return this.orderService.getSum(order);
  }

  getDate(ms: string) {
    return this.orderService.getDate(ms);
  }

  selectOrder(orderNumber) {
    this.router.navigate(['my-account', 'orders', orderNumber]);
  }

  constructor(
    private orderService: OrderService,
    private router: Router,
    private browserCheckService: BrowserCheckService
  ) {}

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
    this.orders = this.orderService.getUserOrdersList();
  }
}
