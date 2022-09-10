import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';


// MODULES
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product/product.service';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { environment } from 'src/environments/environment';
import { ProductsInterceptor } from './services/http.interceptor';
import { CartService } from './services/cart/cart.service';
import { CartComponent } from './cart/cart.component';
import { AuthService } from './services/auth/auth.service';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatDividerModule} from '@angular/material/divider';
import { CheckoutService } from './services/checkout/checkout.service';
import { CurrencyPipe } from '@angular/common';
import { ThankYouComponent } from './common/pages/thankyou/thankyou.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatDialogModule} from '@angular/material/dialog';
import { ResetPasswordComponent } from './common/pages/reset/reset.component';
import { PasswordPageComponent } from './common/pages/password-page/password-page.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AccountComponent } from './user/account/account.component';
import {MatRippleModule} from '@angular/material/core'
import { NgSkeletonModule } from 'ng-skeleton';
import { BannerComponent } from './common/components/banner/banner.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { NbThemeModule, NbToastrService } from '@nebular/theme';
import { NbLayoutModule,NbAlertModule, NbSidebarModule,NbSpinnerModule,NbToastrModule, NbSidebarService, NbStepperModule, NbRadioModule } from '@nebular/theme';
import { RouterModule } from '@angular/router'; 
import { NgxStripeModule } from 'ngx-stripe';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserComponent } from './user/user.component';
import { BoutiqueComponent } from './common/components/boutique/boutique.component';
// import { PinchZoomModule } from 'ngx-pinch-zoom';
import { BackButton } from './common/components/backButton/back-button.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { EventsComponent } from './events/events.component';
import { EventsDetailComponent } from './events-detail/events-detail.component';
import { MenuComponent } from './common/components/menu/menu.component';
import { EventService } from './services/event/event.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MetaService } from './services/meta/meta.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { CommunityManagementComponent } from './community-management/community-management.component';
import { ContactComponent } from './common/components/contact/contact.component';
import { NgxMailtoModule } from 'ngx-mailto';
import { OrdersHistoricComponent } from './common/components/ordersHistoric/orders.component';
import { AccountDetailComponent } from './common/components/account-detail/account-detail.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { PageNotFoundComponent } from './common/pages/page-not-found/page-not-found/page-not-found.component';
import { ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
@NgModule({
  declarations: [
    BackButton,
    BannerComponent,
    AppComponent,
    ShopComponent,
    ProductDetailComponent,
    CategoryComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent, 
    ThankYouComponent, 
    ResetPasswordComponent,
    PasswordPageComponent, 
    AccountComponent, 
    UserComponent, 
    BoutiqueComponent, EventsComponent, EventsDetailComponent, 
    MenuComponent, CommunityManagementComponent, ContactComponent, OrdersHistoricComponent, AccountDetailComponent, PageContactComponent, PageNotFoundComponent
  ],
  imports: [
    ShareIconsModule,
    ShareButtonsModule,
    NbAlertModule,
    NgxMailtoModule, 
  MatTableModule,
    MatTabsModule,
    MatListModule,
    MatBottomSheetModule, 
    MatTooltipModule,
    LoadingBarHttpClientModule, 
    // PinchZoomModule,
    NgSkeletonModule, 
    AngularFirestoreModule, 
    MatRippleModule, 
    MatSnackBarModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatButtonModule, 
    MatSelectModule, 
    MatBadgeModule, 
    SwiperModule,
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule,
    MatDividerModule,
    NbRadioModule, 
    MatIconModule, 
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, 
    MatInputModule, 
    MatRadioModule,
    MatMenuModule,
    NbThemeModule.forRoot(), 
    NgxStripeModule.forRoot(environment.stripeTestKey),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    RouterModule,
    NbStepperModule,
    NbSidebarModule,
    NbSpinnerModule, 
    MatPaginatorModule,
    MatSidenavModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }), 
  ],
  providers: [
    ProductService, 
    NbSidebarService, 
    

    {
      provide: HTTP_INTERCEPTORS, 
      useClass: ProductsInterceptor, 
      multi: true
    }, 
    CartService, 
    AuthService, 
    CheckoutService, 
    CurrencyPipe, 
    EventService, 
    LoadingBarService,
    NbToastrService, 
    MetaService, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
