import { Injectable } from '@angular/core';
import { AngularFireDatabase,  AngularFireObject, AngularFireList } from "angularfire2/database";
import { map } from 'rxjs/operators';

@Injectable()
export class BandMakeService {
  itemRef : any;
  
  constructor(private db: AngularFireDatabase) {}

  getBandMake() {
    this.itemRef =  this.db.list('/bmake').snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
    return this.itemRef;
    
    
  } 

}  
