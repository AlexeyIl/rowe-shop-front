import { BrowserCheckService } from './../../services/browser-check.service';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-bar',
  templateUrl: './request-bar.component.html',
  styleUrls: ['./request-bar.component.scss']
})
export class RequestBarComponent implements OnInit {
  isSlim: BehaviorSubject<boolean>;
  oilReqModalIsOpen = false;

  oilReqModal(): void {
    this.oilReqModalIsOpen = !this.oilReqModalIsOpen;
  }

  constructor(
    private browserCheckService: BrowserCheckService
  ) { }

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
  }

}
