import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrowserCheckService {
  isMobileInfo: boolean;
  slimSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  slim: boolean;
  slimMinWidth = 1340;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(@Inject(PLATFORM_ID) private platformId) {
    if (isPlatformBrowser(platformId)) {
      this.isMobileInfo = this.checkIsMobile();
      this.slimSubject.next(
        !this.isMobile && window.innerWidth > this.slimMinWidth ? false : true
      );
      this.windowSizeCheck().subscribe((vl) => {
        this.slim = vl;
        this.slimSubject.next(vl);
      });
      this.isLoading.next(false);
    }
  }

  private checkIsMobile(): boolean {
    const ua = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  isSlim(): BehaviorSubject<boolean> {
    return this.slimSubject;
  }

  getLoadingStatus(): BehaviorSubject<boolean> {
    return this.isLoading;
  }

  get isBrowser(): boolean {
    return this.platformId === 'browser' ? true : false;
  }

  get isMobile(): boolean {
    return this.isMobileInfo;
  }

  private windowSizeCheck(): Observable<boolean> {
    return fromEvent(window, 'resize').pipe(
      filter((vl) => {
        if (this.isMobile) {
          return false;
        } else if (
          !this.isMobile &&
          this.slim &&
          window.innerWidth > this.slimMinWidth
        ) {
          return true;
        } else if (
          !this.isMobile &&
          !this.slim &&
          window.innerWidth <= this.slimMinWidth
        ) {
          return true;
        } else {
          return false;
        }
      }),
      map((vl) => {
        if (window.innerWidth > this.slimMinWidth) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
