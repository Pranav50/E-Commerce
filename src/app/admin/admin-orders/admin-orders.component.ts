import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  order$: Observable<any[]>;
  
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.order$ = this.orderService.getAllOrders();
  }

}
