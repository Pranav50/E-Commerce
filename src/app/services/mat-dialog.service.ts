import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'; 
import { MatDialogComponent } from '../components/mat-dialog/mat-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MatDialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg) {
   return this.dialog.open(MatDialogComponent, {
      width: '390px',
      position: {top: "100px"},
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg
      } 
    }); 
    
  }
}
