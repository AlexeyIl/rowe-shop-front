import { setUser } from './../../ngrx/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { selectUser } from './../../ngrx/user.reducer';
import { UserModel } from './../../models/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-mobile-account-personal',
  templateUrl: './mobile-account-personal.component.html',
  styleUrls: ['./mobile-account-personal.component.scss']
})
export class MobileAccountPersonalComponent implements OnInit, OnDestroy {
  user: UserModel;
  currentTemplate: 'info' | 'edit' = 'info';
  storeSubscribe: Subscription;
  isPersonalFormChange = false;
  personalFormSubscribe: Subscription;

  personalForm = this.fb.group({
    name: '',
    email: '',
    password: '',
    adress: '',
    phone: '',
  });
  
  changeTemplate(template: 'info' | 'edit'): void {
    this.currentTemplate = template
  }

  personalSubmit(): void {
    this.userService.updateUser(this.personalForm.value).subscribe((vl) => {
      this.store.dispatch(setUser({ user: vl }));
      this.isPersonalFormChange = false;
      this._snackBar.open('Информация обновлена', '', { duration: 3500 });
      this.changeTemplate('info');
    });
  }

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

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
