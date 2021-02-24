import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { StartService } from '../../services/start.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  path = [{name: 'Вход', link: '/login'}];
  error = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login() {
    this.startService.start();
    this.router.navigate(['']);
  }

  submit(form) {
    this.userService
      .loginUser(form.value.email, form.value.password)
      .subscribe((vl) => {
        if (vl && vl.access_token) {
          this.login();
        } else {
          this.error = true;
        }
      });
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private startService: StartService
  ) {}

  ngOnInit(): void {
    if (this.userService.currentUserValue.token) {
      this.router.navigate(['my-account']);
    }
  }
}
