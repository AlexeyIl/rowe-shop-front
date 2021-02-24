import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectName } from '../../ngrx/user.reducer';
import { StartService } from '../../services/start.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { BrowserCheckService } from '../../services/browser-check.service';

@Component({
  selector: 'app-login-badge',
  templateUrl: './login-badge.component.html',
  styleUrls: ['./login-badge.component.scss'],
})
export class LoginBadgeComponent implements OnInit {
  isSlim: BehaviorSubject<boolean>;
  modalIsOpen = false;
  userName: Observable<string> = this.store.pipe(select(selectName));

  constructor(
    private store: Store,
    private startService: StartService,
    private browserCheckService: BrowserCheckService,
    private router: Router
  ) {}

  clickModal(): void {
    this.modalIsOpen = !this.modalIsOpen;
  }

  logout(): void {
    this.startService.logout();
  }

  iconClick(): void {
    this.userName.pipe(
      take(1)
    ).subscribe( vl => {
      if(vl) {
        this.router.navigate(['/my-account/orders'])
      } else {
        this.clickModal();
      }
    })
  }

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
  }
}
