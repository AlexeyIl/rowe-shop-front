import { BehaviorSubject } from 'rxjs';
import { BrowserCheckService } from 'src/app/services/browser-check.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isSlim: BehaviorSubject<boolean>;
  callReqIsOpen = false;

  callReqModal(): void {
    this.callReqIsOpen = !this.callReqIsOpen;
  }

  constructor(
    private browserCheckService: BrowserCheckService
  ) { }

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
  }

}
