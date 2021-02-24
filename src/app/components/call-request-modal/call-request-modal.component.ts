import { enterOpacityAnimation } from './../../animations/enter-opacity.animation';
import { openCloseFastAnimation } from './../../animations/open-close-modal.animation';
import { Router } from '@angular/router';
import { HelpRequestService } from './../../services/help-request.service';
import { selectUser, UserState } from './../../ngrx/user.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-call-request-modal',
  templateUrl: './call-request-modal.component.html',
  styleUrls: ['./call-request-modal.component.scss'],
  animations: [ enterOpacityAnimation,
    openCloseFastAnimation ]
})
export class CallRequestModalComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter();
  userSub: Subscription;
  isComplete = false;
  isOpen = true;

  callReqForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    personal: [false, Validators.pattern('true')]
  });

  close(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }

  navigateToConf(): void {
    this.close();
    this.router.navigate(['/conf']);
  }

  submit(): void {
    this.helpRequestService.addCallRequest(this.callReqForm.value)
    .subscribe(vl => this.isComplete = true)
  }

  private setUser(user: UserState): void {
    this.callReqForm.get('name').setValue(user.name);
    this.callReqForm.get('phone').setValue(user.phone);
  }


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private helpRequestService: HelpRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSub = this.store.select(selectUser).subscribe(vl => this.setUser(vl));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
