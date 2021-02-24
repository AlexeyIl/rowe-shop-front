import { enterOpacityAnimation } from './animations/enter-opacity.animation';
import { BehaviorSubject } from 'rxjs';
import { BrowserCheckService } from 'src/app/services/browser-check.service';
import { Component, OnInit } from '@angular/core';
import { StartService } from './services/start.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ enterOpacityAnimation
  ]
})
export class AppComponent implements OnInit {
  title = 'ROWE Shop';
  isSlim: BehaviorSubject<boolean>;
  isLoading: BehaviorSubject<boolean>;

  onActivate(event) {
    window.scroll(0,0);
}
  constructor(
    private startService: StartService,
    private browserCheckService: BrowserCheckService
    ) {}

  ngOnInit() {
    this.isLoading = this.browserCheckService.getLoadingStatus();
    this.isSlim = this.browserCheckService.isSlim();
    this.startService.start();
  }
}
