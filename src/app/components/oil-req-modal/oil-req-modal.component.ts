import { enterOpacityAnimation } from './../../animations/enter-opacity.animation';
import { openCloseFastAnimation } from './../../animations/open-close-modal.animation';
import { HelpRequestService } from './../../services/help-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-oil-req-modal',
  templateUrl: './oil-req-modal.component.html',
  styleUrls: ['./oil-req-modal.component.scss'],
  animations: [ enterOpacityAnimation,
    openCloseFastAnimation ]
})
export class OilReqModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter();

  isComplete = false;
  isOpen = true;

  oilReqForm = this.fb.group({
    name: [, Validators.required],
    phone: [, Validators.required],
    carBrand: [, Validators.required],
    carModel: [, Validators.required],
    year: [, Validators.required],
    engine: [, Validators.required],
    transmission: [, Validators.required]
  })

  close(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }

  submit(): void {
    this.helpRequestService.addOilChooseRequest(this.oilReqForm.value).
    subscribe(vl => {
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
