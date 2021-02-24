import { BrowserCheckService } from 'src/app/services/browser-check.service';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isSlim: BehaviorSubject<boolean>

  constructor(
    private browserCheckService: BrowserCheckService
  ) {}

  ngOnInit(): void {
    this.isSlim = this.browserCheckService.isSlim();
  }
}
