import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { GenderService } from 'src/app/services/gender.service';
import { PriceService } from 'src/app/services/price.service';
import { ShapeService } from 'src/app/services/shape.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { BandService } from 'src/app/services/band.service';
import { DialService } from 'src/app/services/dial.service';
import { BandMakeService } from 'src/app/services/band-make.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  products: Observable<Product[]>;
  product: Product[] = [];
  categories$;

  @Input('category') category;
  
  gender$;
  @Input('gender') gender;

  price$;
  @Input('price') price;

  shape$;
  @Input('shape') shape; 

  band$;
  @Input('band') band;

  dial$;
  @Input('dial') dial;

  bmake$;
  @Input('bmake') bmake;

  constructor(categoryService: CategoryService, genderService: GenderService,
    priceService: PriceService, private shapeService: ShapeService,
    private productService: ProductService,
    private bandService: BandService,
    private dialService: DialService,
    private bandMakeService: BandMakeService,) { 
    this.categories$ = categoryService.getCategories();
    this.gender$ = genderService.getGender();
    this.price$ = priceService.getPrice();
    this.shape$ = shapeService.getShape();
    this.dial$ = dialService.getDial();
    this.bmake$ = bandMakeService.getBandMake();
    this.band$ = bandService.getBand();
  }

 
  ngOnInit() {
    
  }

} 
