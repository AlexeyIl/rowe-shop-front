import { CartEffects } from './ngrx/cart.effects';
import { FavoritesEffects } from './ngrx/favorites.effects';
import { ProductBadgeSecondComponent } from './components/product-badge/product-badge-second.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from './modules/shared.module';
import { MainComponent } from './components/main/main.component';
import { DostavkaComponent } from './components/dostavka/dostavka.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AboutComponent } from './components/about/about.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CartBadgeComponent } from './components/cart-badge/cart-badge.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './ngrx/cart.reducer';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { LoginBadgeComponent } from './components/login-badge/login-badge.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { PasswordRecoveryPageComponent } from './components/password-recovery-page/password-recovery-page.component';
import { PasswordRecoveryRequestComponent } from './components/password-recovery-request/password-recovery-request.component';
import { userReducer } from './ngrx/user.reducer';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { AccountOrdersComponent } from './components/account-orders/account-orders.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AccountOrderComponent } from './components/account-order/account-order.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { CatalogDropdownComponent } from './components/catalog-dropdown/catalog-dropdown.component';
import { BigSliderComponent } from './components/big-slider/big-slider.component';
import { CompanyBenefitsBadgesComponent } from './components/company-benefits-badges/company-benefits-badges.component';
import { RequestBarComponent } from './components/request-bar/request-bar.component';
import { PopularItemsBarComponent } from './components/popular-items-bar/popular-items-bar.component';
import { CatalogBannersComponent } from './components/catalog-banners/catalog-banners.component';
import { DiscountPageComponent } from './components/discount-page/discount-page.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { AccountFavoritesComponent } from './components/account-favorites/account-favorites.component';
import { AccountAdressesComponent } from './components/account-adresses/account-adresses.component';
import { AccountOrganisationsComponent } from './components/account-organisations/account-organisations.component';
import { ConfidentialPoliticPageComponent } from './components/confidential-politic-page/confidential-politic-page.component';
import { UniModalComponent } from './components/uni-modal/uni-modal.component';
import { OptClientPageComponent } from './components/opt-client-page/opt-client-page.component';
import { CallRequestModalComponent } from './components/call-request-modal/call-request-modal.component';
import { OilReqModalComponent } from './components/oil-req-modal/oil-req-modal.component';
import { OptReqModalComponent } from './components/opt-req-modal/opt-req-modal.component';
import { NguCarouselModule } from '@ngu/carousel';
import { MobileBottomBarComponent } from './components/mobile-bottom-bar/mobile-bottom-bar.component';
import { MobileSearchBarComponent } from './components/mobile-search-bar/mobile-search-bar.component';
import { MobileCatalogBannerComponent } from './components/mobile-catalog-banner/mobile-catalog-banner.component';
import { MobileLoginAdditionalComponent } from './components/mobile-login-additional/mobile-login-additional.component';
import { MobileLkComponent } from './components/mobile-lk/mobile-lk.component';
import { MobileAccountPersonalComponent } from './components/mobile-account-personal/mobile-account-personal.component';
import { MobileOrdersComponent } from './components/mobile-orders/mobile-orders.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    ScrollToTopComponent,
    NavbarComponent,
    SideBarComponent,
    FooterComponent,
    MainComponent,
    DostavkaComponent,
    ContactsComponent,
    AboutComponent,
    SearchBarComponent,
    CartBadgeComponent,
    CartPageComponent,
    CarouselComponent,
    SearchPageComponent,
    CheckoutComponent,
    LoginBadgeComponent,
    LoginPageComponent,
    SignupPageComponent,
    AdminPageComponent,
    EmailVerificationComponent,
    PasswordRecoveryPageComponent,
    PasswordRecoveryRequestComponent,
    AccountPageComponent,
    AccountOrdersComponent,
    AccountSettingsComponent,
    AccountOrderComponent,
    CatalogDropdownComponent,
    BigSliderComponent,
    CompanyBenefitsBadgesComponent,
    RequestBarComponent,
    PopularItemsBarComponent,
    CatalogBannersComponent,
    DiscountPageComponent,
    LoginModalComponent,
    AccountFavoritesComponent,
    AccountAdressesComponent,
    AccountOrganisationsComponent,
    ProductBadgeSecondComponent,
    ConfidentialPoliticPageComponent,
    UniModalComponent,
    OptClientPageComponent,
    CallRequestModalComponent,
    OilReqModalComponent,
    OptReqModalComponent,
    MobileBottomBarComponent,
    MobileSearchBarComponent,
    MobileCatalogBannerComponent,
    MobileLoginAdditionalComponent,
    MobileLkComponent,
    MobileAccountPersonalComponent,
    MobileOrdersComponent,
    FavoritesPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ Cart: cartReducer, User: userReducer }),
    BrowserAnimationsModule,
    MatStepperModule,
    MatSnackBarModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NguCarouselModule,
    EffectsModule.forRoot([FavoritesEffects, CartEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
