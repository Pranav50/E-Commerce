import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  order$: Observable<any[]>;
  constructor(private auth: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.order$ = this.auth.user$.pipe(switchMap(user => this.orderService.getOrderByUser(user.uid).valueChanges()))
  }
 
}
