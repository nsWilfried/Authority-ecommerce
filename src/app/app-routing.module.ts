import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageNotFoundComponent } from './common/pages/page-not-found/page-not-found/page-not-found.component';
import { PasswordPageComponent } from './common/pages/password-page/password-page.component';
import { ResetPasswordComponent } from './common/pages/reset/reset.component';
import { ThankYouComponent } from './common/pages/thankyou/thankyou.component';
import { CommunityManagementComponent } from './community-management/community-management.component';
import { EventsDetailComponent } from './events-detail/events-detail.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './guards/auth-guard/auth-guard.guard';
import { CartemptyGuard } from './guards/cartemtpy/cartempty.guard';
import { PasswordResetGuard } from './guards/password-reset/password-reset.guard';
import { HomeComponent } from './home/home.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AllProductsResolver } from './resolvers/allProducts.resolver';
import { CategoriesResolve } from './resolvers/categories.resolver';
import { EventDetailResolver } from './resolvers/event-detail.resolver';
import { EventsResolver } from './resolvers/events.resolver';
import { PaymentMethodsResolver } from './resolvers/paymentMethods.resolver';
import { ProductDetailResolve } from './resolvers/product-detail.resolver';
import {  ProductsResolve } from './resolvers/products.resolver';
import { ShippingZonesResolver } from './resolvers/shippingZones.resolver';
import { ShopComponent } from './shop/shop.component';
import { AccountComponent } from './user/account/account.component';
import { UserComponent } from './user/user.component';
import { LimitProductsResolve } from './resolvers/limitProducts.resolver'
const routes: Routes = [ 
  { path:'', component: ShopComponent, resolve: {
    products:ProductsResolve, 
    categories: CategoriesResolve
  }}, 
  { path:'notre-menu', component: ShopComponent, resolve: {
    products: ProductsResolve, 
    categories: CategoriesResolve
  }}, 
  { path: 'products/:id', component: ProductDetailComponent, resolve: {
    product: ProductDetailResolve, 
    allProducts: AllProductsResolver
  }}, 
  // { path: 'nous-contacter' , component: PageContactComponent}, 
  {path:"mon-panier", component:CartComponent}, 
  // {path:'services/community-management', component:CommunityManagementComponent},
  {path:'user', component:UserComponent},
  {path:'checkout' ,canActivate: [AuthGuard, CartemptyGuard] ,  component: CheckoutComponent, resolve: {
    shippingZones: ShippingZonesResolver, 
    paymentGateway: PaymentMethodsResolver
  }},
  { path:'thankyou',  component: ThankYouComponent}, 
  {path:'user/reset', component: ResetPasswordComponent}, 
  { path: 'user/reset/action', canActivate: [PasswordResetGuard],  component: PasswordPageComponent}, 
  { path: 'mon-compte', canActivate: [AuthGuard] , component: AccountComponent}, 
  { path: 'evenements', component: EventsComponent, resolve: {
    events: EventsResolver
  }}, 
  { path: 'evenements/:id', component: EventsDetailComponent, resolve: {
    event: EventDetailResolver
  }}, 
  {path: 'page-introuvable', component: PageNotFoundComponent}, 
  {path: '**', redirectTo:'/page-introuvable' }


  // {path:'/wp-admin', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
