import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { FirebaseFirestore } from '@angular/fire';
import { Product } from '../model/product';
 
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  itemRef : any;

  dataSource: AngularFireList<Product>;
  items: Product[] = [];

  constructor(private db: AngularFireDatabase) {}

  create(product) {
    this.db.list('/products').push(product);
  } 

  // This code worked for me for retrieving keys from firebase
  getAll() { 
    this.itemRef =  this.db. list('/products').snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
    return this.itemRef;
  }
 
  get(productId) {
    return this.db.object('/products/' +productId);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove(); 
  }

}
