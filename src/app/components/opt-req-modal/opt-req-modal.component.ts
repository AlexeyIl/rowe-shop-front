import { enterOpacityAnimation } from './../../animations/enter-opacity.animation';
import { openCloseFastAnimation } from './../../animations/open-close-modal.animation';
import { HelpRequestService } from './../../services/help-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-opt-req-modal',
  templateUrl: './opt-req-modal.component.html',
  styleUrls: ['./opt-req-modal.component.scss'],
  animations: [ enterOpacityAnimation
    ,openCloseFastAnimation ]
})
export class OptReqModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter();

  isComplete = false;
  isOpen = true;

  optReqForm = this.fb.group({
    name: [, Validators.required],
    company: [, Validators.required],
    inn: [, Validators.required],
    email: [, Validators.required],
    phone: [, Validators.required]
  })

  close(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }

  submit(): void {
    this.helpRequestService.addWholesaleRequest(this.optReqForm.value)
    .subscribe(vl => {
      this.isComplete = true;
    })
  }

  constructor(
    private fb: FormBuilder,
    private helpRequestService: HelpRequestService
  ) { }

  ngOnInit(): void {
  }
}
