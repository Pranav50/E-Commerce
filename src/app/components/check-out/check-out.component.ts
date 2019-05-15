import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { Subscription, Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PriceService } from 'src/app/services/price.service';
import { Order } from 'src/app/model/order';

declare let paypal: any;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {};
  
  userId: string;
  userName: string;

  cartSubscription: Subscription;
  userSubscription: Subscription;

  @Input('shoppingCart') shoppingCart: ShoppingCart;
  cart$: Observable<any>;
  cart: any;
  
  // Paypal Payment
  addScript: boolean = false;
  totalPrice: any;
  totalItemsCount: any;
  paypalLoad: boolean = true;

  // Stripe Payment
  handler: any;
  
 
  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private priceService: PriceService) {}

  // PayPal Payment
  public ngAfterViewChecked(): void {
    const elementExists: boolean = !!document.getElementById('paypal-checkout-btn');
    if(elementExists && !this.addScript) {
      this.addPaypalScript().then(() => { 
        paypal.Button.render({
          client: {
            // Step 1:  Put your sandbox API (Register for Paypal Developer Account
            // and get the sandbox API)
              sandbox: 'Your Sandbox API Here',
          },
          payment: (data, actions) => {
              return actions.payment.create({
                  payment: {
                    transactions: [
                      {
                          amount: {
                              total:    this.totalPrice,
                              currency: 'USD'
                          },
                          // Step 2: Your Facilitator Paypal email ID
                          // Remember your provided Email ID below must be 
                          // of facilitator and Login Email ID must
                          // be of buyer in order to process the payment
                          payee:{email:'Your facilitator Email ID Here'},
                      }
                  ]
                  }
              });
          },
          commit: true,
          locale: 'en_US',
          style: {
              size:   'responsive', // tiny, small, medium, large, responsive
              color:  'silver', // orange, blue, silver, blue, black
              shape:  'rect', // pill, rect
              label: 'paypal', // checkout, paypal
              tagline: false,   
          },
          env: 'sandbox', // Optional: specify 'sandbox' or 'production'
          onAuthorize: (data, actions) => {
              return actions.payment.execute().then((payment) => {
                this.router.navigate(['/components/order-success']);
                this.cartService.clearCart();
              });
          },
          onCancel: (data) => {
              console.log('payment 1 was cancelled!');
          }
      }, '#paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
  
  // Stripe Payment
  async openCheckout() {
    
      this.handler = StripeCheckout.configure({
        key: environment.stripeKey,
        locale: 'en',
        token: token => {
          this.priceService.processPayment(token, this.totalPrice)
        }
      });
  
      this.handler.open({
        name: 'Timer',
        description: 'You have '+this.totalItemsCount+' items in your Cart',
        amount: this.totalPrice*100, 
      });
 
    }

    @HostListener('window:popstate')
      onpopstate() {
        this.handler.close();
      }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    
    this.cart$ = await this.cartService.getCart();
    this.cart = this.cartService.getCart().then(result => this.cart = result);
    this.totalPrice = this.cart$.subscribe(data => this.totalPrice = data.totalPrice);
    this.totalItemsCount = this.cart$
    .subscribe(data => this.totalItemsCount = data.totalItemsCount);
  
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  cancelTransaction() {
    this.cartService.clearCart();
    this.router.navigate(['/']); 
  }

  async placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items,
      totalPrice: this.cart.totalPrice
    }

    this.orderService.placeOrder(order);    
  } 

}
