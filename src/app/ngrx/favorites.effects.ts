import { NoLoggedUserService } from './../services/no-logged-user.service';
import { selectFavorites } from './user.reducer';
import { Store } from '@ngrx/store';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { addFavorite, deleteFavorite, favoritesUpdateSuccess } from './user.actions';
import { UserService } from './../services/user.service';
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { EMPTY } from 'rxjs';

@Injectable()
export class FavoritesEffects {
    updateFavorites$ = createEffect(() => this.actions$.pipe(
        ofType(addFavorite, deleteFavorite),
        mergeMap(() => this.store.select(selectFavorites)),
        mergeMap((vl) => {
            if(this.userService.currentUserValue.token) {
                return this.userService.updateUserFavorites(vl)
            } else if(this.noLoggedUserService.noLoggedToken != 'server') {
                return this.noLoggedUserService.updateFavorites({favorites: vl, token: this.noLoggedUserService.noLoggedToken})
            }
        }),
        map(() => favoritesUpdateSuccess()),
        catchError(() => EMPTY)
    ))

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private store: Store,
        private noLoggedUserService: NoLoggedUserService
    ) {
        
    }
}