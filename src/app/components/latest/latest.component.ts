import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product); 
  } 

}
