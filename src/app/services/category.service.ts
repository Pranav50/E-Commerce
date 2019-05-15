import { Injectable } from '@angular/core';
import { AngularFireDatabase,  AngularFireObject, AngularFireList } from "angularfire2/database";
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  itemRef : any;
  
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    this.itemRef =  this.db.list('/categories').snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
    return this.itemRef;
    
  } 

}
