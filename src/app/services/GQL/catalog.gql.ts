import {Query, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';


import { ProductModel } from '../../models/product.model';


@Injectable({
    providedIn: 'root'
})
export class GetCatalogGQL extends Query<ResponseGetCatalog> {
    document = gql `
    query getCatalog($ABC: Float, $code: String, $pack: [Float], $category: [String], $group: String, $name: String, $sae: [String], $sortPoll: String, $descending: Boolean) {
        getCatalog(ABC: $ABC, code: $code, pack: $pack, category: $category, group: $group, name: $name, sae: $sae, sortPoll: $sortPoll, descending: $descending)
        {
        pack,
        price,
        name,
        code,
        img,
        quantity
        }
    }
    `
}

@Injectable({
    providedIn: 'root'
})

export class GetPacksGQL extends Query<ResponseGetCatalog> {
    document = gql `
    query getCatalog($ABC: Float, $code: String, $pack: [Float], $category: [String], $group: String, $name: String, $sae: [String], $sortPoll: String, $descending: Boolean) {
        getCatalog(ABC: $ABC, code: $code, pack: $pack, category: $category, group: $group, name: $name, sae: $sae, sortPoll: $sortPoll, descending: $descending)
        {
        pack
        code
        }
    }
    `
}

@Injectable({
    providedIn: 'root'
})
export class GetProductInfoGQL extends Query<ResponseGetCatalog> {
    document = gql `
    query getProductInfo($ABC: Float, $code: String, $pack: [Float], $category: [String], $group: String, $name: String, $sae: [String], $sortPoll: String, $descending: Boolean) {
        getCatalog(ABC: $ABC, code: $code, pack: $pack, category: $category, group: $group, name: $name, sae: $sae, sortPoll: $sortPoll, descending: $descending)
        {
        discription
        category
        pack
        price
        name
        code
        img
        pass
        tech
        sae
        fullDiscription
        benefits
        using
        recomendation
        instructions
        quantity
        approvs
        approvsEqual
        approvsRecomendation
        }
    }
    `
}


export type ResponseGetCatalog = {
    getCatalog: [ProductModel]
};


@Injectable({
    providedIn: 'root'
})
export class GetCatalogSampledCodesGQL extends Query<ResponseCatalogSampledCodes> {
    document = gql `
    query getCatalogSampledCodes($codes: [String!]) {
        getCatalogSampledCodes(codes: $codes)
        {
        pack,
        price,
        name,
        code,
        img,
        quantity
        }
    }
    `
}

export type ResponseCatalogSampledCodes = {
    getCatalogSampledCodes: [ProductModel]
}

