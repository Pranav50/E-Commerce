import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CategoryService } from './services/category.service'; 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { BsFooterComponent } from './components/bs-footer/bs-footer.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductService } from './services/product.service';
import { CustomFormsModule } from 'ng2-validation'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MaterialModule } from './material';
import { ReversePipe } from './reverse.pipe';
import { NgxPaginationModule} from 'ngx-pagination';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { OrderService } from './services/order.service';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { LatestComponent } from './components/latest/latest.component'
import { GenderService } from './services/gender.service'; 
import { PriceService} from './services/price.service';
import { ShapeService } from './services/shape.service';
import { NgxStripeModule } from 'ngx-stripe';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component' ; 
import { MatDialogService } from './services/mat-dialog.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BandMakeService } from './services/band-make.service';
import { DialService} from './services/dial.service';
import { BandService} from './services/band.service';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ListOrderViewComponent } from './components/list-order-view/list-order-view.component';
import { ReceiptComponent } from './components/receipt/receipt.component';

const appRoutes: Routes = [
      {path: '', component: HomeComponent, data: {depth: 1}},
      {path: 'components/shopping-cart', 
      component: ShoppingCartComponent, data: {depth: 2}},

      {
        path: 'components/check-out', 
        component: CheckOutComponent,
        data: {depth: 3}, 
        canActivate:[AuthGuardService]
      },
      {path: 'components/order-success', 
      component: OrderSuccessComponent,
      data: {depth: 4}, 
      canActivate:[AuthGuardService]
      },
      { 
        path:'admin/products/new', 
        component: ProductFormComponent,data: {depth: 5}, 
        canActivate:[AuthGuardService, AdminAuthGuardService]
      },
      {
        path:'admin/products/:id', 
        component: ProductEditComponent, data: {depth: 6},
        canActivate:[AuthGuardService, AdminAuthGuardService] 
      },
      {
        path:'admin/products', 
        component: AdminProductsComponent, data: {depth: 7},
        canActivate:[AuthGuardService, AdminAuthGuardService]
      }, 

      {path:'**', component: DefaultComponent, data: {depth: 8}},
]

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    BsFooterComponent,
    HomeComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    DefaultComponent,
    ProductFormComponent,
    ReversePipe,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    LatestComponent,
    MatDialogComponent,
    ProductEditComponent,
    ListOrderViewComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  providers: [CategoryService, AuthService, AuthGuardService, UserService,
  AdminAuthGuardService, ProductService, ShoppingCartService,OrderService,
  GenderService, PriceService, MatDialogService, ShapeService, BandMakeService,
  DialService, BandService],
  entryComponents: [MatDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
