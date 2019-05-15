import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatTableModule, MatPaginatorModule,MatButtonModule,MatInputModule, 
              MatSortModule, MatIconModule, MatFormFieldModule,MatTabsModule,
              MatExpansionModule, MatDialogModule, MatStepperModule ],
    exports: [MatTableModule, MatPaginatorModule,MatButtonModule,MatInputModule, 
              MatSortModule, MatIconModule, MatFormFieldModule, MatTabsModule,
              MatExpansionModule, MatDialogModule, MatStepperModule]
})
export class MaterialModule {}