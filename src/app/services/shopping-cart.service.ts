import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../model/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../model/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  quantity:number;
 
  constructor(private db: AngularFireDatabase, ) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId).snapshotChanges()
    .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
  } 

  // Working Code (Perfect)
  async addToCart(product:Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product:Product) {
    this.updateItem(product, -1);
  } 

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
  }

  private create() {
   return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }
 
 
  private getItem(cartId:string, productId: String) {
   return this.db.object('/shopping-cart/' + cartId + 
   '/items/' +productId);
  }

 private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;  
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
   item$.snapshotChanges().pipe(take(1)).subscribe(item => {

    if (item.payload.exists()) {
      let quantity = item.payload.exportVal().quantity + change;
      if (quantity === 0) item$.remove();
      else
        item$.update({product: product,
        quantity: quantity
      });
    } else {
      item$.set({product: product, quantity: 1});
    }
   })
  }
}
