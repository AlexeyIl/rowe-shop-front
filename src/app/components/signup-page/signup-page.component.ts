import { selectFavorites } from './../../ngrx/user.reducer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCart, CartItem } from '../../ngrx/cart.reducer';
import { switchMap, map, take } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signUpForm = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(12)]],
  });

  email: string;
  mailSended = false;
  path = ['Регистрация'];
  favorites: [string];

  submit(form) {
    this.store
      .select(selectCart)
      .pipe(
        switchMap((cart: [CartItem]) =>
          this.userService.addUser(
            form.value.login,
            form.value.email,
            form.value.password,
            form.value.phone,
            cart,
            this.favorites
          )
        ),
        map((vl: UserModel) => {
          if (vl.name) {
            this.email = vl.email;
            this.mailSended = true;
            setTimeout(() => this.router.navigate(['', 'login']), 10500);
          }
        })
      )
      .subscribe();
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectFavorites).pipe(
      take(1)
    ).subscribe(vl => this.favorites = vl);
  }
}
