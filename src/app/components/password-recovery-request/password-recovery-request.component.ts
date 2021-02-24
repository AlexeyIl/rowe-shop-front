import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-recovery-request',
  templateUrl: './password-recovery-request.component.html',
  styleUrls: ['./password-recovery-request.component.scss'],
})
export class PasswordRecoveryRequestComponent implements OnInit {
  path = [{name: 'Восстановление пароля', link: 'recovery'}];
  isNotFound = false;
  isSended = false;

  recoveryForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(form) {
    this.userService
      .recoveryPasswordRequest(form.value.email)
      .subscribe((vl) => {
        if (vl) {
          this.isSended = true;
          this.isNotFound = false;
        } else {
          this.isNotFound = true;
        }
      });
  }

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {}
}
