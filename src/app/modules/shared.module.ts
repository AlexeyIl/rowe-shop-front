import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NumPipe } from '../pipes/num.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PathBarComponent } from '../components/path-bar/path-bar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NumPipe, PathBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule,
    RouterModule
  ],
  exports: [
    NumPipe,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PathBarComponent,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule
  ],
})
export class SharedModule {}
