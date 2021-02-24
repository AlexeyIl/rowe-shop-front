import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-uni-modal',
  templateUrl: './uni-modal.component.html',
  styleUrls: ['./uni-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniModalComponent implements OnInit {
  @Input() context: UniModalInterface;
  @Output() closeModal = new EventEmitter();

  close(): void {
    this.closeModal.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }
}

export type UniModalInterface = {
  header: string,
  body: string,
  buttonText: string
}
