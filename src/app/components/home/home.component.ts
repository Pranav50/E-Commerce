import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { PriceService } from 'src/app/services/price.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 

 export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories$;

  category:string; 
  gender: string;
  shape: string;
  price: number;
  bmake: string;
  band:string;
  dial:string;

  subscription: Subscription;
  searchKey: string;
  
  currentPage: any;

  price$;

  filteredProducts: Product[] = []; 
  pageActual: number = 1;
  cart$: Observable<ShoppingCart>;
 
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor( 
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private priceService: PriceService) {
      this.price$ = this.priceService.getPrice();
      this.subscription = this.productService.getAll()
    .subscribe(products => products)
   }
 
   addToCart() {
    this.cartService.addToCart(this.product);
   } 
  
  onClick(p) {  
    if(p == '20 - 30') {
      this.filteredProducts = (p) ? 
      this.products.filter(p => p.price >= 20 && p.price <= 30)
      : this.products;
    } if(p == '30 - 40') {
      this.filteredProducts = (p) ? 
      this.products.filter(p => p.price >= 30 && p.price <= 40)
      : this.products;
    } if(p == '40 - 50') {
      this.filteredProducts = (p) ? 
      this.products.filter(p => p.price >= 40 && p.price <= 50)
      : this.products;
    } if(p == '50 - 60') {
      this.filteredProducts = (p) ? 
      this.products.filter(p => p.price >= 50 && p.price <= 60)
      : this.products;
    } if(p == "Above 60") {
      this.filteredProducts = (p) ? 
      this.products.filter(p => p.price > 60)
      : this.products;
    } if(p == "Under 20") {
      this.filteredProducts = (p) ? 
      this.products.filter(p => p.price < 20)
      : this.products;
    } if(p == "All Price") {
      this.filteredProducts = this.products;
    }
  }
 
  private populateProducts() { 
    
    this.productService.getAll().subscribe(products => {
        this.products = products;
      
      this.route.queryParamMap.subscribe(params => {
        
          this.category = params.get('category');
          this.applyFilterCategory();
        if(params.get('gender') || this.gender) {
          this.gender = params.get('gender');
          this.applyFilterGender();
        }
        if(params.get('shape') || this.shape) {
          this.shape = params.get('shape');
          this.applyFilterShape();
        } if(params.get('bmake') || this.bmake) {
          this.bmake = params.get('bmake');
          this.applyFilterBandMake();
        }if(params.get('band') || this.band) {
          this.band = params.get('band');
          this.applyFilterBand();
        }if(params.get('dial') || this.dial) {
          this.dial = params.get('dial');
          this.applyFilterDial();
        }
      });
    }); 
  } 

  // For Category
  private applyFilterCategory() { 
    this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.categories === this.category) : 
        this.products; 
  }

  // For Gender
  private applyFilterGender() {
    this.filteredProducts = (this.gender) ? 
    this.products.filter(p => p.gender === this.gender) : 
      this.products; 
  }
  // For Shape
  private applyFilterShape(){
    this.filteredProducts = (this.shape) ? 
    this.products.filter(p => p.shape === this.shape) : 
      this.products;
  }

  // For Band Make
  applyFilterBandMake() {
    this.filteredProducts = (this.bmake) ? 
    this.products.filter(p => p.bmake === this.bmake) : 
      this.products;
  }

  // For Band Color
  applyFilterBand() {
    this.filteredProducts = (this.band) ? 
    this.products.filter(p => p.band === this.band) : 
      this.products;
  }

  // For Dial Color
  applyFilterDial() {
    this.filteredProducts = (this.dial) ? 
    this.products.filter(p => p.dial === this.dial) : 
      this.products;
  }

  // For Search Query
  filter(query: string) {
    this.filteredProducts = (query) ? 
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    : this.products;
  }

  // For Clearing Search
  onClear() {
    let query: string;
    this.searchKey = "";
    this.filter(query);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async ngOnInit() { 
    this.cart$ = await this.cartService.getCart();
    this.populateProducts(); 
   }

   onPageChange(page: number) {
    this.currentPage = page;
    window.scrollTo({top: 510, behavior: 'smooth'});
 }
} 
