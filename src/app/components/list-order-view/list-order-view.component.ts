import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-order-view',
  templateUrl: './list-order-view.component.html',
  styleUrls: ['./list-order-view.component.scss']
})
export class ListOrderViewComponent implements OnInit {
  
  @Input('order$') order$: Observable<any[]>;
  constructor() { }

  ngOnInit() {
  }

}
