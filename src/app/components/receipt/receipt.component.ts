import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  cart$: Observable<any>;
  cart: any;
  
  constructor(private cartService: ShoppingCartService, private router: Router) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cart = this.cartService.getCart().then(result => this.cart = result);
  }

  public downloadPdf() {
    var data = document.getElementById('contentToConvert'); 
    html2canvas(data).then(canvas => { 
    // Few necessary setting options 
      var imgWidth = 208; 
      var pageHeight = 295; 
      var imgHeight = canvas.height * imgWidth / canvas.width; 
      var heightLeft = imgHeight; 
 
      const contentDataURL = canvas.toDataURL('image/png') 
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF 
      var position = 0; 
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) 
      pdf.save('MYPdf.pdf'); // Generated PDF  
      });
    }
  } 
