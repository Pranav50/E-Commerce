import { Injectable } from '@angular/core';
import { AngularFireDatabase,  AngularFireObject, AngularFireList } from "angularfire2/database";
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class PriceService {
  itemRef : any;

  userId: string;
  
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if(auth) this.userId = auth.uid;
    })
  }

  getPrice() {
    this.itemRef =  this.db.list('/price').snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
    return this.itemRef; 
  } 
  processPayment(token: any, amount) {
    const payment = { token, amount}
    return this.db.list(`/payments/${this.userId}`).push(payment)
  } 

}  
