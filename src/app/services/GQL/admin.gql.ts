import {Mutation, gql} from 'apollo-angular';
import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root'
})
export class UploadAdminStockGQL extends Mutation<ResponseUploadStock> {
    document = gql `
    mutation uploadFile($file: Upload!){
        uploadFile(file: $file)
    }
    `
}

export type ResponseUploadStock = {
    uploadFile: boolean
}