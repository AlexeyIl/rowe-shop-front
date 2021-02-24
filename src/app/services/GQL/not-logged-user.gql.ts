import { Query, gql, Mutation } from 'apollo-angular';
import {Injectable} from '@angular/core';


import { NoLoggedUserModel } from 'src/app/models/no-logged-user.model';


@Injectable({
    providedIn: 'root'
})
export class GetNoLoggedUserGQL extends Query<ResponseGetNoLoggedUser> {
    document = gql `
    query getNotLoggedUser($token: String!){
        getNotLoggedUser(token: $token){
            token
            favorites
            cart {
                count
                product {
                    code
                    name
                    price
                    pack
                    img
                }

            }
        }
    }
    `
}

export type ResponseGetNoLoggedUser = {
    getNotLoggedUser: NoLoggedUserModel
}

@Injectable({
    providedIn: 'root'
})
export class UpdateNotUserFavoritesGQL extends Mutation<ResponseUpdateNotUserFavorites> {
    document = gql `
    mutation updateFavorites($token: String!, $favorites: [String]!){
        updateFavorites(token: $token, favorites: $favorites){
            token
            favorites
        }
    }
    `
}

export type ResponseUpdateNotUserFavorites = {
    updateFavorites: NoLoggedUserModel
}

