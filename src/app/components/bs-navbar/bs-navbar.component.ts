import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/model/app-user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
 
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})

export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  searchKey:string;
  products: Product[];

  
  constructor(private auth: AuthService,
    private cartService: ShoppingCartService) {
      auth.appUser$.subscribe(appUser => this.appUser = appUser);
   }
  
  login() {
      this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();

  } 
}
