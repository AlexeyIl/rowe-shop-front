import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { selectUser } from '../../ngrx/user.reducer';
import { UserService } from '../../services/user.service';
import { setUser } from '../../ngrx/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  user: UserModel;
  isChangeModeShow = false;
  isPersonalFormChange = false;
  personalFormSubscribe: Subscription;
  storeSubscribe: Subscription;

  personalForm = this.fb.group({
    name: '',
    email: '',
    password: '',
    adress: '',
    phone: '',
  });

  changeMode(): void {
    this.isChangeModeShow = !this.isChangeModeShow;
  }

  personalSubmit(): void {
    this.userService.updateUser(this.personalForm.value).subscribe((vl) => {
      this.store.dispatch(setUser({ user: vl }));
      this.isPersonalFormChange = false;
      this._snackBar.open('Информация обновлена', '', { duration: 3500 });
      this.changeMode();
    });
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.storeSubscribe = this.store.select(selectUser)
    .subscribe((vl) => {
      this.user = vl;
      this.personalForm.get('name').setValue(vl.name);
      this.personalForm.get('email').setValue(vl.email);
      this.personalForm.get('phone').setValue(vl.phone);
      this.personalForm.get('adress').setValue(vl.adress);
    });
    this.personalFormSubscribe = this.personalForm.valueChanges
      .pipe(
        map((vl) => {
          if (
            this.user.name != vl.name ||
            this.user.email != vl.email ||
            this.user.adress != vl.adress ||
            this.user.phone != vl.phone ||
            vl.password != ''
          ) {
            return true;
          }
          return false;
        }),
        tap((vl) => (this.isPersonalFormChange = vl))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.storeSubscribe.unsubscribe();
    this.personalFormSubscribe.unsubscribe();
  }
}
