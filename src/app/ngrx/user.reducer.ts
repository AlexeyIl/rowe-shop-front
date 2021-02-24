import {
  createReducer,
  on,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  email: string;
  name: string;
  adress: string;
  phone: string;
  favorites;
}

export const initialState: UserState = {
  email: '',
  name: '',
  adress: '',
  phone: '',
  favorites: []
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.setUser, (state, { user }) => {
    return {
      ...state,
      name: user.name,
      adress: user.adress,
      phone: user.phone,
      email: user.email,
      favorites: user.favorites
    };
  }),
  on(UserActions.setName, (state, { name }) => {
    return { ...state, name };
  }),
  on(UserActions.setEmail, (state, { email }) => {
    return { ...state, email };
  }),
  on(UserActions.setAdress, (state, { adress }) => {
    return { ...state, adress };
  }),
  on(UserActions.setPhone, (state, { phone }) => {
    return { ...state, phone };
  }),
  on(UserActions.removeAll, (state) => {
    return { ...state, name: '', adress: '', email: '', phone: '', favorites: [] };
  }),
  on(UserActions.addFavorite, (state, { code }) => {
    if (!state.favorites.includes(code)) {
      const newFavs = [...state.favorites, code];
      return {...state, favorites: newFavs};
    } else {
      return { ...state }
    }
  }),
  on(UserActions.deleteFavorite, (state, { code }) => {
    const i = state.favorites.indexOf(code);
    if ( i === -1) {
      return { ...state };
    } else {
      const newFavs = [];
      state.favorites.forEach(vl => newFavs.push(vl));
      newFavs.splice(i, 1);
      return { ...state, favorites: newFavs };
    }
  }),
  on(UserActions.loadFavorites, (state, { codes }) => {
    return {...state, favorites: codes };
  })
);

export const userState = createFeatureSelector<UserState>('User');

export const selectName = createSelector(
  userState,
  (state: UserState) => state.name
);

export const selectEmail = createSelector(
  userState,
  (state: UserState) => state.email
);

export const selectPhone = createSelector(
  userState,
  (state: UserState) => state.phone
);

export const selectUser = createSelector(
  userState,
  (state: UserState) => state
);

export const selectFavorites = createSelector(
  userState,
  (state: UserState) => state.favorites
)