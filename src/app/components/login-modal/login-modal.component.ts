import { enterOpacityAnimation } from '../../animations/enter-opacity.animation';
import { openCloseFastAnimation } from './../../animations/open-close-modal.animation';
import { selectFavorites } from './../../ngrx/user.reducer';
import { Store } from '@ngrx/store';
import { UserModel } from './../../models/user.model';
import { map, switchMap, take } from 'rxjs/operators';
import { selectCart, CartItem } from './../../ngrx/cart.reducer';
import { UserService } from './../../services/user.service';
import { StartService } from './../../services/start.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  animations: [
    enterOpacityAnimation, openCloseFastAnimation
  ]
})
export class LoginModalComponent implements OnInit {
  @Output() closeModalEmitter = new EventEmitter();

  favorites: [string];
  isOpen = true;
  currentModal = 'login';
  isError = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  recoveryForm = this.fb.group({
    recoveryEmail: ['', [Validators.required, Validators.email]],
  });

  registrationForm = this.fb.group({
    registrationLogin: ['', [Validators.required]],
    registrationPassword: ['', [Validators.required, Validators.minLength(8)]],
    registrationEmail: ['', [Validators.required, Validators.email]],
    registrationPhone: ['', [Validators.required, Validators.minLength(12)]],
  });

  private login(): void {
    this.startService.start();
    this.close();
  }

  close(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.closeModalEmitter.emit();
    }, 300);
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
          this.currentModal = 'recovery-sended';
        } else {
          this.isError = true;
        }
      });
  }

  submitRegistration(form): void {
    this.store
      .select(selectCart)
      .pipe(
        take(1),
        switchMap((cart: [CartItem]) =>
          this.userService.addUser(
            form.value.registrationLogin,
            form.value.registrationEmail,
            form.value.registrationPassword,
            form.value.registrationPhone,
            cart,
            this.favorites
          )
        ),
        map((vl: UserModel) => {
          if (vl?.name) {
            this.currentModal = 'email';
          } else {
            this.isError = true;
          }
        })
      )
      .subscribe();
  }

  changeModal(modalName: string): void {
    this.isError = false;
    this.currentModal = modalName;
  }
  
  cleanError(): void {
    this.isError = false;
  }

  constructor(
    private fb: FormBuilder,
    private startService: StartService,
    private userService: UserService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectFavorites).pipe(
      take(1)
    ).subscribe(vl => this.favorites = vl);
  }
}
