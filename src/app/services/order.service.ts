import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  async placeOrder(order) {
    let result  = await this.db.list('/order').push(order);
    return result;
  }

  getAllOrders() {
    return this.db.list('/order').snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })); 
  }

  getOrderByUser(userId: string) {
    return this.db.list('/order',ref => 
    ref.orderByChild('userId').equalTo(userId));
  }

  getOrderById(orderId: string) {
    return this.db.object('/order/' + orderId);
  }
}
