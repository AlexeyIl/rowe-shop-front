import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isAdmin().pipe(
      tap((vl) => {
        if (vl === false) this.router.navigate(['', 'login']);
      })
    );
  }
}
