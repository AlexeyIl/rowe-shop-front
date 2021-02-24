import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BrowserCheckService } from '../../services/browser-check.service';
import { Store } from '@ngrx/store';
import { selectCount, selectSum } from '../../ngrx/cart.reducer';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  isSlim: BehaviorSubject<boolean>;
  totalCount: Observable<number>;
  totalSum: Observable<number>;

  constructor(
    private browserCheckService: BrowserCheckService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
    this.totalCount = this.store.select(selectCount);
    this.totalSum = this.store.select(selectSum);
  }
}
