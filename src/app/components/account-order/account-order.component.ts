import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap, take } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { OrderModel } from '../../models/order.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { BrowserCheckService } from '../../services/browser-check.service';

@Component({
  selector: 'app-account-order',
  templateUrl: './account-order.component.html',
  styleUrls: ['./account-order.component.scss'],
})
export class AccountOrderComponent implements OnInit {
  displayedColumns = ['no', 'code', 'name', 'quantity', 'price', 'sum'];
  order: Observable<OrderModel>;
  sum = 0;
  isSlim: BehaviorSubject<boolean>;

  getDate(ms: string) {
    return this.orderService.getDate(ms);
  }

  getSum(order: OrderModel) {
    return this.orderService.getSum(order);
  }

  select(code: string) {
    this.router.navigate(['catalog', code]);
  }

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private browserCheckService: BrowserCheckService
  ) {}

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
    this.order = this.route.paramMap.pipe(
      take(1),
      switchMap((params: ParamMap) => params.getAll('id')),
      switchMap((vl) => this.orderService.getUserOrder(+vl)),
      tap((vl) => (this.sum = this.getSum(vl)))
    );
  }
}
