import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import {DataTableModule} from "@pascalhonegger/ng-datatable";
import { DataFilterPipe } from './components/item-list/data-filter.pipe';

import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { PaymentService } from './services/payment.service';
import { ShippingService } from './services/shipping.service';
import { BookService } from './services/book.service';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { OrderService } from './services/order.service';

import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderComponent } from './components/order/order.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { HoursComponent } from './components/hours/hours.component';
import { FaqComponent } from './components/faq/faq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    DataFilterPipe,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent,
    MyProfileComponent,
    ItemListComponent,
    ItemDetailComponent,
    ShoppingCartComponent,
    OrderComponent,
    OrderSummaryComponent,
    BestSellerComponent,
    HoursComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    RouterModule.forRoot([
      { path:'', component: HomeComponent},
      { path:'home', component: HomeComponent},
      { path:'myAccount', component: MyAccountComponent},
      { path:'myProfile', component: MyProfileComponent},
      { path:'bookList', component: ItemListComponent},
      { path:'bookDetail/:id', component: ItemDetailComponent},
      { path:'shoppingCart', component: ShoppingCartComponent},
      { path:'order', component: OrderComponent},
      { path:'orderSummary', component: OrderSummaryComponent},
      { path:'hours', component: HoursComponent},
      { path:'faq', component: FaqComponent}

    ]),
    BrowserAnimationsModule
  ],
  providers: [
    LoginService,
    UserService,
    PaymentService,
    ShippingService,
    BookService,
    CartService,
    CheckoutService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
