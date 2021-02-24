import {Query, Mutation, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';


import { UserModel } from '../../models/user.model';
import { CartItem } from '../../ngrx/cart.reducer';

@Injectable({
    providedIn: 'root'
})
export class AddUsersGQL extends Mutation<ResponseAddUsers> {
    document = gql `
    mutation addUser($name: String!, $email: String!, $password: String!, $phone: String!, $cart: [CartItemARGS], $favorites: [String]!){
        addUser(name: $name, email: $email, password: $password, phone: $phone, cart: $cart, favorites: $favorites){
            name
            email
        }
    }
    `
}

export type ResponseAddUsers = {
    addUser: UserModel
}

@Injectable({
    providedIn: 'root'
})
export class LoginUserGQL extends Query<ResponseLoginUser> {
    document = gql `
    query loginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password){
            access_token
            name
            email
            phone
            favorites
        }
    }
    `
}

export type ResponseLoginUser = {
    loginUser: TokenLoginUser
}

export type TokenLoginUser = {
    access_token: string
    name: string,
    email: string,
    pthone: string,
    id: string
}

@Injectable({
    providedIn: 'root'
})
export class GetUserGQL extends Query<ResponseGetUser> {
    document = gql `
    query getUser{
        getUser{
            name
            email
            phone
            favorites
            adress
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

export type ResponseGetUser = {
    getUser: {
        name: string,
        email: string,
        cart: [CartItem],
        favorites: [string]
    }
}


@Injectable({
    providedIn: 'root'
})
export class CheckIsAdminGQL extends Query<ResponseIsAdmin> {
    document = gql `
        query checkIsAdmin{
            checkIsAdmin
        }
    `
}

export type ResponseIsAdmin = {
    checkIsAdmin: boolean
}

@Injectable({
    providedIn: 'root'
})
export class VerifyEmailGQL extends Query<ResponseVerifyEmail> {
    document = gql `
    query verifyEmail($emailToken: String!){
        verifyEmail(emailToken: $emailToken){
            email 
        }
    }
    `
}

export type ResponseVerifyEmail = {
    verifyEmail: UserModel
}

@Injectable({
    providedIn: 'root'
})
export class PasswordRecoveryReqGQL extends Query<ResponsePasswordRecoveryReq> {
    document = gql`
    query passwordRecoveryReq($email: String!){
        passwordRecoveryReq(email: $email)
    }
    `
}

export type ResponsePasswordRecoveryReq = {
    passwordRecoveryReq: boolean
}

@Injectable({
    providedIn: 'root'
})
export class RecoveryTokenCheckGQL extends Query<ResponseRecoveryTokenCheck> {
    document = gql`
    query recoveryTokenCheck($token: String!){
        recoveryTokenCheck(token: $token)
    }
    `
}

export type ResponseRecoveryTokenCheck = {
    recoveryTokenCheck: boolean
}

@Injectable({
    providedIn: 'root'
})
export class SetNewPassByRecoveryGQL extends Mutation<ResponseSetNewPassByRecovery> {
    document = gql`
    mutation setNewPasswordByRecovery($password: String!, $token: String!){
        setNewPasswordByRecovery(password: $password, token: $token)
    }
    `
}

export type ResponseSetNewPassByRecovery = {
    setNewPasswordByRecovery: boolean
}

@Injectable({
    providedIn: 'root'
})
export class UpdateUserGQL extends Mutation<ResponseUpdateUser> {
    document = gql`
    mutation updateUser($email: String, $name: String, $phone: String, $adress: String, $password: String){
        updateUser(email: $email, name: $name, phone: $phone, adress: $adress, password: $password){
            name
            phone
            adress
            email
            favorites
        }
    }
    `
}

export type ResponseUpdateUser = {
    updateUser: UserModel
}


@Injectable({
    providedIn: 'root'
})
export class UpdateUserFavoritesGQL extends Mutation<ResponseUpdateUserFavorites> {
    document = gql`
    mutation updateUserFavorites($codes: [String]!){
        updateUserFavorites(codes: $codes){
            favorites
        }
    }
    `
}

export type ResponseUpdateUserFavorites = {
    updateUserFavorites: UserModel
}



