import {Query, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';


import { SearchListItem } from '../../models/search-list-teim.model';


@Injectable({
    providedIn: 'root'
})
export class GetSearchListGQL extends Query<ResponseGetSearchList> {
    document = gql `
    query getSearchList($input: String!, $length: Float)
    {
        getSearchList(input: $input, length: $length)
            {
                name,
                price,
                code
            }
    }
    `
}

export type ResponseGetSearchList = {
    getSearchList: [SearchListItem]
}
