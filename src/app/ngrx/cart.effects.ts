import { CartItem } from 'src/app/ngrx/cart.reducer';
import { selectCart } from './cart.reducer';
import { Store } from '@ngrx/store';
import { NoLoggedUserService } from './../services/no-logged-user.service';
import { UserService } from 'src/app/services/user.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { addProduct, deleteProduct, removeProduct, updateCartSuccess } from './cart.actions';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { EMPTY } from 'rxjs';

@Injectable()
export class CartEffects {
    updateCart$ = createEffect(() => this.actions$.pipe(
        ofType(addProduct, removeProduct, deleteProduct),
        mergeMap(() => this.store.select(selectCart)),
        mergeMap((vl: [CartItem]) => {
            if(this.userService.currentUserValue.token) {
                return this.userService.updateCart(vl)
            } else if(this.noLoggedUserService.noLoggedToken != 'server') {
                return this.noLoggedUserService.updateCart({cart: vl, token: this.noLoggedUserService.noLoggedToken})
            }
        }),
        map(() => updateCartSuccess()),
        catchError(() => EMPTY)
        )
    )

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private noLoggedUserService: NoLoggedUserService,
        private store: Store
    ) {
        
    }
}