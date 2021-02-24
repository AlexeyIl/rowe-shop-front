import { Injectable } from '@angular/core';
import { UploadAdminStockGQL } from './GQL/admin.gql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private uploadAdminStockGQL: UploadAdminStockGQL) {}

  uploadStock(file) {
    return this.uploadAdminStockGQL
      .mutate({ file }, { context: { useMultipart: true } })
      .pipe(map((vl) => vl.data.uploadFile));
  }
}
