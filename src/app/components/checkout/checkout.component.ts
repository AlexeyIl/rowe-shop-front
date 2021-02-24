import { BrowserCheckService } from './../../services/browser-check.service';
import { UniModalInterface } from './../uni-modal/uni-modal.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { OrderModel } from 'src/app/models/order.model';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/ngrx/cart.reducer';
import { cleanCart } from 'src/app/ngrx/cart.actions';
import { UserService } from '../../services/user.service';
import { selectCart } from '../../ngrx/cart.reducer';
import { UserState, selectUser } from '../../ngrx/user.reducer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') private stepper: any;
  path = [{name: 'Оформление заказа', link: '/checkout'}];
  orderNumber: number;
  cart: Observable<CartItem[]>;
  isEditable = true;
  orderComplete = false;
  storeSubscribe;
  modalCompleteIsOpen = false;
  modalCompleteText: UniModalInterface;
  isSlim: Observable<boolean>;

  personalForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(12)]],
    mail: ['', [Validators.required, Validators.email]],
    personal: [false, Validators.pattern('true')],
  });
  deliveryForm = this.fb.group({
    delivery: ['', Validators.required],
    adress: [{ value: null, disabled: true }],
  });
  payForm = this.fb.group({
    payment: ['', Validators.required],
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private userService: UserService,
    private browserService: BrowserCheckService
  ) {}

  ngOnInit(): void {
    this.cart = this.getStore();
    this.isSlim = this.browserService.isSlim();
    this.storeSubscribe = this.store
      .select(selectUser)
      .subscribe((vl) => this.setUser(vl));
  }

  ngOnDestroy(): void {
    this.storeSubscribe.unsubscribe();
  }

  submit(): void {
    this.cart
      .pipe(
        take(1),
        switchMap((vl) => this.submitOrder(vl)),
        tap((vl) => {
          this.isEditable = false;
          this.orderNumber = vl.number;
          this.orderComplete = true;
          this.openCompleteModal();
          this.store.dispatch(cleanCart());
        })
      )
      .subscribe();
  }

  changeDelivery(isDelivery: boolean): void {
    if (isDelivery) {
      this.deliveryForm.get('adress').enable();
      this.deliveryForm.get('adress').setValidators([Validators.required]);
    } else {
      this.deliveryForm.get('adress').disable();
      this.deliveryForm.get('adress').setValidators(null);
    }
    this.deliveryForm.get('adress').updateValueAndValidity();
  }

  getStore(): Observable<CartItem[]> {
    return this.store.pipe(select(selectCart));
  }

  openCompleteModal(): void {
    this.modalCompleteText = {
      header: 'Спасибо за заказ!',
      body: `Ваш заказ принят, в ближайшее время наш менеджер свяжется с вами для подтверждения, номер заказа № ${this.orderNumber}`,
      buttonText: 'Продолжить покупки'
    };
    this.modalCompleteIsOpen = true;
  }

  closeModal(): void {
    this.modalCompleteIsOpen = false;
    this.router.navigate(['']);
  }

  private submitOrder(cart: CartItem[]): Observable<OrderModel> {
    const order = new OrderModel({
      name: this.personalForm.get('name').value,
      phone: this.personalForm.get('phone').value,
      delivery: this.deliveryForm.get('delivery').value,
      adress: this.deliveryForm.get('adress').value,
      cart,
      mail: this.personalForm.get('mail').value,
      personal: this.personalForm.get('personal').value,
      payment: this.payForm.get('payment').value,
    });
    if (this.userService.currentUserValue.token) {
      return this.orderService.submitUserOrder(order);
    }
    return this.orderService.submitOrder(order);
  }

  private setUser(state: UserState): void {
    this.personalForm.get('name').setValue(state.name);
    this.personalForm.get('mail').setValue(state.email);
    this.personalForm.get('phone').setValue(state.phone);
  }
}
