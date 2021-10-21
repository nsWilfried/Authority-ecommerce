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
  { path:'', component: HomeComponent, resolve: {
    products:LimitProductsResolve, 
    categories: CategoriesResolve
  }, data :{animation: 'home'} }, 

  { path:'notre-menu', component: ShopComponent, resolve: {
    products: ProductsResolve, 
    categories: CategoriesResolve
  }, data: {animation: 'menu'}}, 

  { path: 'products/:id', component: ProductDetailComponent, resolve: {
    product: ProductDetailResolve, 
    allProducts: AllProductsResolver
  }, data: {animation: 'product-detail'}}, 
  { path: 'nous-contacter' , component: PageContactComponent, data:{animation: 'contact'}}, 
  {path:"mon-panier", component:CartComponent, data: {animation: 'cart'}}, 
  {path:'services/community-management', component:CommunityManagementComponent, data: {animation: 'cm'}},
  {path:'user', component:UserComponent, data: {animation: 'user'}},
  {path:'checkout' ,canActivate: [AuthGuard, CartemptyGuard] ,  component: CheckoutComponent, resolve: {
    shippingZones: ShippingZonesResolver, 
    paymentGateway: PaymentMethodsResolver
  }, data: {animation: 'checkout'}},
  { path:'thankyou',  component: ThankYouComponent}, 
  {path:'user/reset', component: ResetPasswordComponent, data: {animation: 'password-reset'}}, 
  { path: 'user/reset/action', canActivate: [PasswordResetGuard],  component: PasswordPageComponent, data: {animation: 'password-reset-action'}}, 
  { path: 'mon-compte', canActivate: [AuthGuard] , component: AccountComponent, data: {animation: 'account'}}, 
  { path: 'evenements', component: EventsComponent, resolve: {
    events: EventsResolver
  }, data: {animation: 'events'}}, 
  { path: 'evenements/:id', component: EventsDetailComponent, resolve: {
    event: EventDetailResolver
  }, data: {animation: 'event-detail'}}, 
  {path: 'page-introuvable', component: PageNotFoundComponent, data: {animation:'page-not-found'}}, 
  {path: '**', redirectTo:'/page-introuvable' }


  // {path:'/wp-admin', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
