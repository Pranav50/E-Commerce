import { Injectable } from '@angular/core';
import { AngularFireDatabase,  AngularFireObject, AngularFireList } from "angularfire2/database";
import { map } from 'rxjs/operators';

@Injectable()
export class ShapeService {
  itemRef : any;
  
  constructor(private db: AngularFireDatabase) {}

  getShape() {
    this.itemRef =  this.db.list('/shape').snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
    return this.itemRef;
  } 

}  
