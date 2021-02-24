import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password-recovery-page',
  templateUrl: './password-recovery-page.component.html',
  styleUrls: ['./password-recovery-page.component.scss'],
})
export class PasswordRecoveryPageComponent implements OnInit {
  path = [{name: 'Восстановление пароля', link: 'recovery'}];
  isTokenValid = false;
  user: Observable<UserModel>;
  isChanged = false;
  token: string;

  recoveryForm = this.fb.group({
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  });

  submit(form) {
    this.userService
      .setNewPassword(form.value.password, this.token)
      .subscribe((vl) => {
        if (vl) {
          this.isChanged = true;
          setTimeout(() => this.router.navigate(['', 'login']), 3500);
        }
      });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => params.getAll('token')),
        tap((vl) => (this.token = vl)),
        switchMap((vl) => this.userService.checkRecoveryToken(vl))
      )
      .subscribe((vl) => {
        if (vl) {
          this.isTokenValid = true;
        } else {
          this.router.navigate(['', 'login']);
        }
      });
  }
}
