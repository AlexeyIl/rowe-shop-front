import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  user: Observable<UserModel>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => params.getAll('token')),
      switchMap((vl) => this.userService.verifyEmail(vl)),
      tap(() => setTimeout(() => this.router.navigate(['']), 4500))
    );
  }
}
