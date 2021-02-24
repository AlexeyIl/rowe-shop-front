import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { OptClientPageComponent } from './components/opt-client-page/opt-client-page.component';
import { ConfidentialPoliticPageComponent } from './components/confidential-politic-page/confidential-politic-page.component';
import { AccountOrganisationsComponent } from './components/account-organisations/account-organisations.component';
import { AccountAdressesComponent } from './components/account-adresses/account-adresses.component';
import { AccountFavoritesComponent } from './components/account-favorites/account-favorites.component';
import { DiscountPageComponent } from './components/discount-page/discount-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { DostavkaComponent } from './components/dostavka/dostavka.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminGuard } from './guards/admin.guard';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { PasswordRecoveryPageComponent } from './components/password-recovery-page/password-recovery-page.component';
import { PasswordRecoveryRequestComponent } from './components/password-recovery-request/password-recovery-request.component';
import { AccountOrdersComponent } from './components/account-orders/account-orders.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AccountOrderComponent } from './components/account-order/account-order.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'dostavka',
    component: DostavkaComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'podbor',
    loadChildren: () =>
      import('./modules/podbor/podbor.module').then((m) => m.PodborModule),
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'sign',
    component: SignupPageComponent,
  },
  {
    path: 'my-account',
    canActivate: [AuthGuard],
    component: AccountPageComponent,
    children: [
      {
        path: 'orders',
        component: AccountOrdersComponent,
      },
      {
        path: 'settings',
        component: AccountSettingsComponent,
      },
      {
        path: 'orders/:id',
        component: AccountOrderComponent,
      },
      {
        path: 'favorites',
        component: AccountFavoritesComponent,
      },
      {
        path: 'adresses',
        component: AccountAdressesComponent,
      },
      {
        path: 'organisations',
        component: AccountOrganisationsComponent,
      }
    ],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'verification/:token',
    component: EmailVerificationComponent,
  },
  {
    path: 'recovery',
    component: PasswordRecoveryRequestComponent,
  },
  {
    path: 'recovery/:token',
    component: PasswordRecoveryPageComponent,
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./modules/catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'discount',
    component: DiscountPageComponent
  },
  {
    path: 'conf',
    component: ConfidentialPoliticPageComponent
  },
  {
    path: 'opt',
    component: OptClientPageComponent
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
