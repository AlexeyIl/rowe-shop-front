import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  uploadForm = this.fb.group({
    epz: ['', [Validators.required]],
    rowe: ['', [Validators.required]],
    fileEpz: [''],
    fileRowe: [''],
  });
  isLoaded = false;
  isSuccess: boolean;
  epz;
  rowe;

  submit() {
    this.adminService
      .uploadStock({ epz: this.epz, rowe: this.rowe })
      .subscribe((vl) => this.afterUpload(vl));
  }

  onFileChange(event) {
    this.patchValue(event, event.target.attributes.formcontrolname.nodeValue);
  }

  private patchValue(event, src: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (src === 'epz') {
        this.epz = file;
      }
      if (src === 'rowe') {
        this.rowe = file;
      }
    }
  }

  afterUpload(res: boolean): void {
    this.isLoaded = true;
    res ? (this.isSuccess = true) : (this.isSuccess = false);
  }

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {}
}
