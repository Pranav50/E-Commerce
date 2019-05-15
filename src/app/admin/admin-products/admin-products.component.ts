import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogService } from 'src/app/services/mat-dialog.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  items: Product[] = [];
  itemCount: number;
  dude: any;
  id;

  listData: MatTableDataSource<any[]>;
  displayedColumns: string[] = ['title', 'price','gender','shape', 'categories',
   'imageUrl', 'edit', 'delete'];

   @ViewChild(MatSort) sort:  MatSort;
   @ViewChild(MatPaginator) paginator:  MatPaginator;
   searchKey:string;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private dialogService: MatDialogService) { 

    this.id = this.route.snapshot.paramMap.get('id');
    
    this.subscription = this.productService.getAll().
    subscribe(products => {
    this.products = products;
    });
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(key) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.productService.delete(key);
      }
    }); 
  } 

  ngOnInit() {
    this.productService.getAll().subscribe(
      list=> {
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
  }
}
