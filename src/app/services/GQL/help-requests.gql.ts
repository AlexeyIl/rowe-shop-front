import { CallRequestModel, WholesaleRequestModel, OilChooseRequestModel } from './../../models/help-request.model';
import { Mutation, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddCallRequestGQL extends Mutation<ResponseAddCallRequest> {
  document = gql`
    mutation addCallRequest(
      $name: String!
      $phone: String!
    ) {
      addCallRequest(
        name: $name
        phone: $phone
      ) {
        name
        phone
        date
      }
    }
  `;
}

export type ResponseAddCallRequest = {
  addCallRequest: CallRequestModel;
};

@Injectable({
    providedIn: 'root',
  })
  export class AddOilChooseRequestGQL extends Mutation<ResponseAddOilChooseRequest> {
    document = gql`
      mutation addOilChooseRequest(
            $name: String!,
            $phone: String!,
            $carBrand: String!,
            $carModel: String!,
            $year: String!,
            $engine: String!,
            $transmission: String!
        ) {
        addOilChooseRequest(
            name: $name,
            phone: $phone,
            carBrand: $carBrand,
            carModel: $carModel,
            year: $year,
            engine: $engine,
            transmission: $transmission
        ) {
          date
        }
      }
    `;
  }
  
  export type ResponseAddOilChooseRequest = {
    addOilChooseRequest: OilChooseRequestModel;
  };

  @Injectable({
    providedIn: 'root',
  })
  export class AddWholesaleRequestGQL extends Mutation<ResponseAddWholesaleRequest> {
    document = gql`
      mutation addWholesaleRequest(
            $name: String!,
            $company: String!,
            $inn: String!,
            $email: String!,
            $phone: String!,
        ) {
            addWholesaleRequest(
            name: $name,
            company: $company,
            inn: $inn,
            email: $email,
            phone: $phone,
        ) {
          date
        }
      }
    `;
  }
  
  export type ResponseAddWholesaleRequest = {
    addWholesaleRequest: WholesaleRequestModel;
  };

  