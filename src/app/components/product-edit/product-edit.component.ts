import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'
import { Subject } from 'rxjs';
import { PriceService } from 'src/app/services/price.service';
import { ShapeService } from 'src/app/services/shape.service';
import { DialService } from 'src/app/services/dial.service';
import { BandMakeService } from 'src/app/services/band-make.service';
import { BandService } from 'src/app/services/band.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
}) 
export class ProductEditComponent implements OnInit {
  categories$;
  shape$;
  price$;
  dial$;
  band$;
  bmake$;
  product = {};
  genders: any = ['Male','Female'];
  genderSelected: string = '';
  id;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService, 
    private productService: ProductService,
    private priceService: PriceService,
    private shapeService: ShapeService, 
    private dialService: DialService,
    private bandMakeService: BandMakeService,
    private bandService: BandService) {

    this.categories$ = categoryService.getCategories();
    this.price$ = priceService.getPrice();
    this.shape$ = shapeService.getShape();
    this.dial$ = dialService.getDial();
    this.band$ = bandService.getBand();
    this.bmake$ = bandMakeService.getBandMake();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log("PRODUCT ID", this.id);
    
    // Important line of code to get single product from firebase
    if(this.id) this.productService.get(this.id).valueChanges().
    pipe(take(1)).subscribe(p => this.product = p);

  }
  
  save(product) {
    if(this.id) this.productService.update(this.id, product)
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
    
  }
 
  radioChange(event: any) {
      this.genderSelected = event.target.value;
  }

  ngOnInit() {
  }  

}
