import { PathBarInterface } from './../path-bar/path-bar.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectName } from '../../ngrx/user.reducer';
import { StartService } from '../../services/start.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  path: PathBarInterface[] = [{name: 'Личный кабинет', link: '/my-account'}];
  userName;

  logout(): void {
    this.startService.logout();
  }

  isHome(url: string): boolean {
    return this.router.url === url
  }

  constructor(
    private startService: StartService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.store.pipe(select(selectName));
  }
}
