import { map } from 'rxjs/operators';
import { CallRequestModel, OilChooseRequestModel, WholesaleRequestModel } from './../models/help-request.model';
import { AddCallRequestGQL, AddOilChooseRequestGQL, AddWholesaleRequestGQL } from './GQL/help-requests.gql';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  constructor(
    private addCallRequestGQL: AddCallRequestGQL,
    private addOilChooseRequestGQL: AddOilChooseRequestGQL,
    private addWholesaleRequestGQL: AddWholesaleRequestGQL
  ) { }

  addCallRequest(req: CallRequestModel): Observable<CallRequestModel> {
    return this.addCallRequestGQL.mutate(req).pipe(
      map(vl => vl.data.addCallRequest)
    )
  }

  addOilChooseRequest(req: OilChooseRequestModel ): Observable<OilChooseRequestModel> {
    return this.addOilChooseRequestGQL.mutate(req).pipe(
      map(vl => vl.data.addOilChooseRequest)
    )
  }

  addWholesaleRequest(req: WholesaleRequestModel): Observable<WholesaleRequestModel> {
    return this.addWholesaleRequestGQL.mutate(req).pipe(
      map(vl => vl.data.addWholesaleRequest)
    )
  }

}
