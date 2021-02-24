import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { BrowserCheckService } from '../../services/browser-check.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isSlim: BehaviorSubject<boolean>;
  isLogged: boolean;
  menuIsopen = false;
  callReqIsOpen = false;

  menuClick(): void {
    this.menuIsopen = !this.menuIsopen;
  }

  callReqModal(): void {
    this.callReqIsOpen = !this.callReqIsOpen;
  }

  slimMenuList: menuList[] = [
    {
      name: 'Личный кабинет',
      link: 'login',
    }, {
      name: 'Доставка',
      link: 'dostavka'
    }, {
      name: 'Подбор масла',
      link: 'podbor'
    }, {
      name: 'Каталог',
      link: 'catalog'
    }, {
      name: 'О компании',
      link: 'about'
    }
  ];

  constructor(
    private browserCheck: BrowserCheckService,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.isSlim = this.browserCheck.isSlim();
    this.isLogged = this.userService.currentUserValue.token ? true : false;
  }
}

type menuList = {
  name: string;
  link: string;
};
