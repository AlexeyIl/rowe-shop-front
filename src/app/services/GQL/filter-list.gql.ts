import {Query, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';


import { FilterListModel } from '../../models/filte-list.model';


@Injectable({
    providedIn: 'root'
})
export class GetFilterListGQL extends Query<ResponseGetFilterList> {
    document = gql `
    query getFilterList($category: String){
        getFilterList(category: $category){
            sae
            pack
        }
    }
    `
}

export type ResponseGetFilterList = {
    getFilterList: FilterListModel
}
