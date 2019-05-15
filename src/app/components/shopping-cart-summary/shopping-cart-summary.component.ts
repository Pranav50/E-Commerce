import { Component, Input, AfterViewChecked, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})

export class ShoppingCartSummaryComponent implements OnInit {

cart$: Observable<any>;
cart: any;

constructor(private cartService: ShoppingCartService, private router: Router) { } 

async ngOnInit() {
  this.cart$ = await this.cartService.getCart();
  this.cart = this.cartService.getCart().then(result => this.cart = result);
} 
}
