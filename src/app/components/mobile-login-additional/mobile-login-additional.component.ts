import { UserModel } from './../../models/user.model';
import { selectCart, CartItem } from './../../ngrx/cart.reducer';
import { map, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserService } from './../../services/user.service';
import { StartService } from './../../services/start.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-login-additional',
  templateUrl: './mobile-login-additional.component.html',
  styleUrls: ['./mobile-login-additional.component.scss']
})
export class MobileLoginAdditionalComponent implements OnInit {
  currentTemplate: 'login' | 'signUp' | 'recovery' | 'signUpComplete' | 'recoveryComplete' | 'lk' = 'login';
  isError = false;
  @Output()closeEmitter: EventEmitter<any> = new EventEmitter();
  loginForm = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    password: [,[Validators.required]]
  });

  recoveryForm = this.fb.group({
    recoveryEmail: ['', [Validators.required, Validators.email]],
  });

  signUpForm = this.fb.group({
    registrationName: ['', [Validators.required]],
    registrationPassword: ['', [Validators.required, Validators.minLength(8)]],
    registrationEmail: ['', [Validators.required, Validators.email]],
    registrationPhone: ['', [Validators.required, Validators.minLength(12)]],
  });

  private login(): void {
    this.startService.start();
    this.closeEmitter.emit();
    this.switchTemplate('lk');
  }

  logout(): void {
    this.startService.logout();
    this.switchTemplate('login')
  }

  submitLogin(form): void {
    this.userService
      .loginUser(form.value.email, form.value.password)
      .subscribe((vl) => {
        if (vl?.access_token) {
          this.login();
        } else {
          this.isError = true;
        }
      });
  }

  submitRecovery(form): void {
    this.userService
      .recoveryPasswordRequest(form.value.recoveryEmail)
      .subscribe((vl) => {
        if (vl) {
          this.switchTemplate('recoveryComplete');
        } else {
          this.isError = true;
        }
      });
  }

  submitSignUp(form): void {
    this.store
      .select(selectCart)
      .pipe(
        take(1),
        switchMap((cart: [CartItem]) =>
          this.userService.addUser(
            form.value.registrationName,
            form.value.registrationEmail,
            form.value.registrationPassword,
            form.value.registrationPhone,
            cart,
            []
          )
        ),
        map((vl: UserModel) => {
          if (vl?.name) {
            this.switchTemplate('signUpComplete');
          } else {
            this.isError = true;
          }
        })
      )
      .subscribe();
  }


  switchTemplate(template: 'login' | 'signUp' | 'recovery' | 'recoveryComplete' | 'signUpComplete' | 'lk'): void {
    this.currentTemplate = template;
  }

  constructor(
    private fb: FormBuilder,
    private startService: StartService,
    private userService: UserService,
    private store: Store
  ) { }

  ngOnInit(): void {
    if (this.userService.currentUserValue.token) {
        this.switchTemplate('lk');
      }
    }
}
