import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  cart$: Observable<any>;
  cart: any;
  
  constructor(private cartService: ShoppingCartService, private router: Router) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cart = this.cartService.getCart().then(result => this.cart = result);
  }

  public downloadPdf() {
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer) 
      {
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width' : 190,
      'elementHandlers' : specialElementHandlers
    })

    doc.save('order-summary.pdf');
  }
}
