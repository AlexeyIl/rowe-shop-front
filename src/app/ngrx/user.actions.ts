import { createAction, props } from '@ngrx/store';
import { UserModel } from '../models/user.model';
export const setName = createAction('Set User Name', props<{ name: string }>());
export const setEmail = createAction(
  'Set User Email',
  props<{ email: string }>()
);
export const setAdress = createAction(
  'Set User Adress',
  props<{ adress: string }>()
);
export const setPhone = createAction(
  'Set User Phone',
  props<{ phone: string }>()
);
export const setUser = createAction('Set User', props<{ user: UserModel }>());
export const removeAll = createAction('Remove All Info');
export const addFavorite = createAction('Add Favorite Item', props<{code: string}>());
export const deleteFavorite = createAction('Delete Favorite Item', props<{code: string}>());
export const loadFavorites = createAction('Load Favorites', props<{codes: [string]}>());
export const favoritesUpdateSuccess = createAction('Favorites update succsess');