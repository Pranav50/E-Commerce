import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, 
  public dialogRef: MatDialogRef<MatDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close(false);
  }

  ngOnInit() { 
  }

}
